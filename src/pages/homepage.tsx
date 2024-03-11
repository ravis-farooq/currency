import React, { ChangeEvent, useCallback, useState } from "react";
import DatePicker from "react-datepicker";
import {
  formatDate,
  getMaxDate,
  getMinDate,
  initialDate,
} from "../utils/dateHelper";

import { HomePageProps } from "../types/homepageType";
import Table from "../components/atoms/table";
import BaseCurrency from "../components/molecules/baseCurrency";
import { useFetch } from "../hooks/useFetch";

import { CurrencyExchangeType } from "../types/currencyRespType";
import Select from "../components/atoms/select";
import Loader from "../components/atoms/Loader";

const HomePage: React.FC<HomePageProps> = () => {
  const [startDate, setStartDate] = useState(initialDate());
  const [baseCurrency, setBaseCurrency] = useState("GBP");
  const [baseValue, setBaseValue] = useState(1);
  const [symbols, setSymbols] = useState<string[]>([
    "GBP",
    "EUR",
    "USD",
    "JPY",
    "CHF",
    "CAD",
    "AUD",
    "ZAR",
  ]);

  const { data, loading, error } = useFetch<CurrencyExchangeType>(
    `/fluctuation?start_date=${formatDate(startDate)}&end_date=${formatDate(
      new Date()
    )}&base=${baseCurrency}`
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
    console.log(symbols.length);
    if (symbols.length > 4) {
      //here 4 is given because we also have base currency in symbols but we don't need to show that in table
      const updatedRowHeadings = symbols.filter((h) => h !== currency);
      setSymbols(updatedRowHeadings);
    } else {
      console.error("At least there should be 3 entities");
    }
  };
  if (loading) {
    return <Loader />;
  }
  if (error) {
    return JSON.stringify(error, null, 2);
  }

  return (
    <>
      <h1>Currency converter </h1>

      <div className="flex-container">
        <div className="flex-row">
          <label htmlFor="date">From Date:</label>
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
      {symbols.length < 8 && (
        <div className="flex-row">
          <p> Add a currency </p>
          <Select
            handleChange={(eV: ChangeEvent<HTMLSelectElement>) => {
              if (eV?.target?.value) {
                setSymbols((prev) => [...prev, eV?.target?.value]);
              }
            }}
            value={undefined}
            options={Object.keys(data ? data?.rates : {})?.filter(
              (elem) => !symbols.includes(elem)
            )}
          />
        </div>
      )}
      <Table
        baseCurrency={baseCurrency}
        symbols={symbols}
        baseValue={baseValue}
        data={data ? data?.rates : {}}
        handleRemoveCurrency={handleRemoveCurrency}
      />
    </>
  );
};

export default HomePage;
