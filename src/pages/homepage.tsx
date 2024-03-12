import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import toast from "react-hot-toast";

import {
  decrementDate,
  formatDate,
  getMaxDate,
  getMinDate,
} from "../utils/datehelper";
import Table from "../components/atoms/table";
import BaseCurrency from "../components/molecules/basecurrency";
import Select from "../components/atoms/select";
import Loader from "../components/atoms/loader";
import {
  CurrencyApiResponse,
  CurrencyExchangeType,
} from "../types/currencyresptype";

import { fetchCurrencies, fetchExchangeRate } from "../api";

enum Currency {
  GBP = "gbp",
  EUR = "eur",
  USD = "usd",
  JPY = "jpy",
  CHF = "chf",
  CAD = "cad",
  AUD = "aud",
  ZAR = "zar",
}

const HomePage: React.FC = () => {
  const [exchangeData, setExchangeData] = useState<
    {
      [x: number]:
        | {
            [x: string]: number;
          }[]
        | undefined;
    }[]
  >([]);
  const [loader, setLoader] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [data, setData] = useState<CurrencyExchangeType>();
  const [baseCurrency, setBaseCurrency] = useState(Currency.GBP);
  const [baseValue, setBaseValue] = useState(1);
  const [symbols, setSymbols] = useState<Currency[]>([
    Currency.GBP,
    Currency.EUR,
    Currency.USD,
    Currency.JPY,
    Currency.CHF,
    Currency.CAD,
    Currency.AUD,
    Currency.ZAR,
  ]);

  const handleInputChange = useCallback((eV: ChangeEvent<HTMLInputElement>) => {
    setBaseValue(+eV?.target?.value);
  }, []);

  const handleSelectChange = useCallback(
    (eV: ChangeEvent<HTMLSelectElement>) => {
      setBaseCurrency(eV?.target?.value as Currency);
      setExchangeData([]);
      // setDataList([]);
    },
    []
  );

  const handleRemoveCurrency = (currency: string) => {
    if (symbols.length > 4) {
      //here 4 is given because we also have base currency in symbols but we don't need to show that in table
      const updatedRowHeadings = symbols.filter((h) => h !== currency);
      setSymbols(updatedRowHeadings);
    } else {
      console.error("At least there should be 3 entities");
      toast.error("At least there must be 3 currencies in the table");
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const resp = await fetchCurrencies<CurrencyExchangeType>(
          "/currency-api@latest/v1/currencies.json"
        );
        console.log("SAR", resp?.data);
        setData(resp?.data);
      } catch (e) {
        console.error(e, "error we face");
      }
    })();
  }, []);

  useEffect(() => {
    if (exchangeData.length > 0) {
      setExchangeData([]);
    }
    const fetchDataForDate = async (dateOffset: number) => {
      try {
        setLoader(true);
        const formattedDate = formatDate(decrementDate(startDate, dateOffset));
        const path = `/currency-api@${formattedDate}/v1/currencies/${baseCurrency}.json`;

        const resp = await fetchExchangeRate<CurrencyApiResponse>(path);

        const payload = {
          date: [resp?.data?.date ?? formattedDate],
          data: resp?.data
            ? Object.entries(resp?.data[baseCurrency])
                .filter(
                  ([key]) =>
                    symbols.includes(key as Currency) && key !== baseCurrency
                )
                .map(([key, value]) => ({ [key]: value }))
            : [],
        };

        setExchangeData((prevData) => [...prevData, payload]);
      } catch (e) {
        console.error(e, "error we face");
      } finally {
        setLoader(false);
      }
    };

    // Loop to fetch data for the previous 6 dates
    for (let i = 0; i <= 6; i++) {
      fetchDataForDate(i);
    }
  }, [baseCurrency, startDate, symbols]);

  if (loader) {
    return <Loader />;
  }

  return (
    <>
      <h1>Currency converter </h1>

      <div className="flex-container">
        <div className="flex-row">
          <label htmlFor="date">Selected Date:</label>
          <DatePicker
            selected={startDate}
            onChange={(date: Date) => {
              setExchangeData([]);
              setStartDate(date);
              // setDataList([]);
            }}
            minDate={getMinDate()}
            maxDate={getMaxDate()}
            className="calendar"
            dateFormat="YYYY-MM-dd"
          />
        </div>

        <div className="flex-row">
          <BaseCurrency
            options={symbols}
            inputValue={baseValue}
            handleInputChange={handleInputChange}
            handleSelectChange={handleSelectChange}
            selectValue={baseCurrency}
          />
        </div>
      </div>
      {
        <Table
          baseValue={baseValue}
          data={exchangeData}
          handleRemoveCurrency={handleRemoveCurrency}
          currencyNames={data as unknown as Record<string, string>}
        />
      }

      {
        <div
          className="flex-col  justify-center "
          style={{
            border: "1px solid #fff",
            width: "max-content",
            padding: "1rem",
            borderRadius: "1rem",
            margin: "0 auto",
          }}
        >
          <p> Add new currency in above table </p>
          <p style={{ fontSize: "0.8rem" }}>*Only 7 can be added</p>
          <Select
            // disabled={symbols.length > 7}
            handleChange={(eV: ChangeEvent<HTMLSelectElement>) => {
              if (
                eV.target.value &&
                !symbols.includes(eV.target.value as Currency)
              ) {
                setSymbols((prev) => [...prev, eV.target.value as Currency]);
              }
            }}
            value={undefined}
            options={Object.keys(data ? data : {}).filter(
              (elem) =>
                !symbols.includes(elem as Currency) &&
                data![elem as Currency] !== ""
            )}
          />
        </div>
      }
    </>
  );
};

export default HomePage;
