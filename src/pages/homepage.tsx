import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import {
  decrementDate,
  formatDate,
  getMaxDate,
  getMinDate,
} from "../utils/dateHelper";

import Table from "../components/atoms/table";
import BaseCurrency from "../components/molecules/baseCurrency";
import { useFetch } from "../hooks/useFetch";

import Select from "../components/atoms/select";
import Loader from "../components/atoms/Loader";
import { FetchRateType } from "../types/atomicType";
import toast from "react-hot-toast";
import { CurrencyExchangeType } from "../types/currencyRespType";

const HomePage: React.FC = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [baseCurrency, setBaseCurrency] = useState("gbp");
  const [baseValue, setBaseValue] = useState(1);
  const [symbols, setSymbols] = useState<string[]>([
    "gbp",
    "eur",
    "usd",
    "jpy",
    "chf",
    "cad",
    "aud",
    "zar",
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
  } = useFetch<FetchRateType>(
    `/currency-api@${formatDate(startDate)}/v1/currencies/${baseCurrency}.json`
  );

  const {
    data: data2,
    error: error2,
    loading: loading2,
  } = useFetch<FetchRateType>(
    `/currency-api@${formatDate(
      decrementDate(startDate, 1)
    )}/v1/currencies/${baseCurrency}.json`
  );
  const {
    data: data3,
    error: error3,
    loading: loading3,
  } = useFetch<FetchRateType>(
    `/currency-api@${formatDate(
      decrementDate(startDate, 2)
    )}/v1/currencies/${baseCurrency}.json`
  );
  const {
    data: data4,
    error: error4,
    loading: loading4,
  } = useFetch<FetchRateType>(
    `/currency-api@${formatDate(
      decrementDate(startDate, 3)
    )}/v1/currencies/${baseCurrency}.json`
  );
  const {
    data: data5,
    error: error5,
    loading: loading5,
  } = useFetch<FetchRateType>(
    `/currency-api@${formatDate(
      decrementDate(startDate, 4)
    )}/v1/currencies/${baseCurrency}.json`
  );
  const {
    data: data6,
    error: error6,
    loading: loading6,
  } = useFetch<FetchRateType>(
    `/currency-api@${formatDate(
      decrementDate(startDate, 5)
    )}/v1/currencies/${baseCurrency}.json`
  );
  const {
    data: data7,
    error: error7,
    loading: loading7,
  } = useFetch<FetchRateType>(
    `/currency-api@${formatDate(
      decrementDate(startDate, 6)
    )}/v1/currencies/${baseCurrency}.json`
  );
  const [dataList, setDataList] = useState<Record<string, any>[]>([]);

  useEffect(() => {
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
      const dataObj: Record<string, any>[] =
        Object.values(localdataList).some((elem) => {
          return elem?.data !== undefined;
        }) &&
        Object.keys(localdataList).length > 0 &&
        Object.entries(localdataList).some(
          (elem) => elem?.[1].data !== undefined
        ) &&
        Object.entries(localdataList)?.map(([date, value]) => {
          return {
            date,
            currency: Object.keys(value?.data ? value?.data[baseCurrency] : {})
              .filter((item) => symbols.includes(item) && item !== baseCurrency)
              .map((key) => {
                // eslint-disable-next-line no-unsafe-optional-chaining
                return { [key]: (value?.data![baseCurrency])[key], name: key };
              }),
          };
        });
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
          data={dataList as unknown as Record<string, number>[]}
          handleRemoveCurrency={handleRemoveCurrency}
        />
      )}

      {symbols.length < 8 && (
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
          <Select
            handleChange={(eV: ChangeEvent<HTMLSelectElement>) => {
              if (eV?.target?.value) {
                setSymbols((prev) => [...prev, eV?.target?.value]);
              }
            }}
            value={undefined}
            options={Object.keys(data ? data : {})?.filter(
              (elem) => !symbols.includes(elem) && data![elem] !== ""
            )}
          />
        </div>
      )}
    </>
  );
};

export default HomePage;
