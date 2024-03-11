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
import { useFetch } from "../hooks/usefetch";

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
  const [startDate, setStartDate] = useState(new Date());
  const [baseCurrency, setBaseCurrency] = useState("gbp");
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

  const { data, loading, error } = useFetch<CurrencyExchangeType>(
    `/currency-api@latest/v1/currencies.json`
  );

  const handleInputChange = useCallback((eV: ChangeEvent<HTMLInputElement>) => {
    setBaseValue(+eV?.target?.value);
  }, []);

  const handleSelectChange = useCallback(
    (eV: ChangeEvent<HTMLSelectElement>) => {
      setBaseCurrency(eV?.target?.value);
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

  const {
    data: data1,
    error: error1,
    loading: loading1,
  } = useFetch<CurrencyApiResponse>(
    `/currency-api@${formatDate(startDate)}/v1/currencies/${baseCurrency}.json`
  );

  const {
    data: data2,
    error: error2,
    loading: loading2,
  } = useFetch<CurrencyApiResponse>(
    `/currency-api@${formatDate(
      decrementDate(startDate, 1)
    )}/v1/currencies/${baseCurrency}.json`
  );
  const {
    data: data3,
    error: error3,
    loading: loading3,
  } = useFetch<CurrencyApiResponse>(
    `/currency-api@${formatDate(
      decrementDate(startDate, 2)
    )}/v1/currencies/${baseCurrency}.json`
  );
  const {
    data: data4,
    error: error4,
    loading: loading4,
  } = useFetch<CurrencyApiResponse>(
    `/currency-api@${formatDate(
      decrementDate(startDate, 3)
    )}/v1/currencies/${baseCurrency}.json`
  );
  const {
    data: data5,
    error: error5,
    loading: loading5,
  } = useFetch<CurrencyApiResponse>(
    `/currency-api@${formatDate(
      decrementDate(startDate, 4)
    )}/v1/currencies/${baseCurrency}.json`
  );
  const {
    data: data6,
    error: error6,
    loading: loading6,
  } = useFetch<CurrencyApiResponse>(
    `/currency-api@${formatDate(
      decrementDate(startDate, 5)
    )}/v1/currencies/${baseCurrency}.json`
  );
  const {
    data: data7,
    error: error7,
    loading: loading7,
  } = useFetch<CurrencyApiResponse>(
    `/currency-api@${formatDate(
      decrementDate(startDate, 6)
    )}/v1/currencies/${baseCurrency}.json`
  );

  const [dataList, setDataList] = useState<
    {
      date: string;
      currency: { [x: string]: string | number; name: string }[];
    }[]
  >([]);

  const localdataList = {
    [formatDate(startDate)]: {
      data: data1,
      error: error1,
      loading: loading1,
    },
    [formatDate(decrementDate(startDate, 1))]: {
      data: data2,
      error: error2,
      loading: loading2,
    },
    [formatDate(decrementDate(startDate, 2))]: {
      data: data3,
      error: error3,
      loading: loading3,
    },
    [formatDate(decrementDate(startDate, 3))]: {
      data: data4,
      error: error4,
      loading: loading4,
    },
    [formatDate(decrementDate(startDate, 4))]: {
      data: data5,
      error: error5,
      loading: loading5,
    },
    [formatDate(decrementDate(startDate, 5))]: {
      data: data6,
      error: error6,
      loading: loading6,
    },
    [formatDate(decrementDate(startDate, 6))]: {
      data: data7,
      error: error7,
      loading: loading7,
    },
  };

  useEffect(() => {
    if (
      !(
        loading ||
        loading1 ||
        loading2 ||
        loading3 ||
        loading4 ||
        loading5 ||
        loading6 ||
        loading7
      )
    ) {
      const dataObj = Object.values(localdataList).every(
        (elem) => elem.data !== undefined
      )
        ? Object.entries(localdataList)?.map(([date, value]) => {
            return {
              date,
              currency: Object.keys(
                value?.data ? value?.data[baseCurrency] : {}
              )
                .filter(
                  (item) =>
                    symbols.includes(item as Currency) && item !== baseCurrency
                )
                .map((key) => {
                  return {
                    [key]:
                      value?.data !== undefined
                        ? value?.data[baseCurrency][key]
                        : 0,
                    name: key,
                  };
                }),
            };
          })
        : [];

      setDataList(dataObj);
    }
  }, [
    data1,
    data2,
    data3,
    data4,
    data5,
    data6,
    data7,
    error1,
    error2,
    error3,
    error4,
    error5,
    error6,
    error7,
    loading,
    loading1,
    loading2,
    loading3,
    loading4,
    loading5,
    loading6,
    loading7,
    startDate,
    symbols,
  ]);

  if (
    loading ||
    loading1 ||
    loading2 ||
    loading3 ||
    loading4 ||
    loading5 ||
    loading6 ||
    loading7
  ) {
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
            onChange={(date: Date) => setStartDate(date)}
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
      {error ||
      error1 ||
      error2 ||
      error3 ||
      error4 ||
      error5 ||
      error6 ||
      error7 ? (
        <div style={{ padding: "1rem" }}>
          No Data Available choose other date to proceed
        </div>
      ) : (
        <Table
          baseCurrency={baseCurrency}
          symbols={symbols}
          baseValue={baseValue}
          data={dataList}
          handleRemoveCurrency={handleRemoveCurrency}
        />
      )}

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
            disabled={symbols.length > 7}
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
