import React, { ChangeEvent } from "react";
import Input from "../atoms/input";
import Select from "../atoms/select";

type BaseCurrencyProps = {
  options: string[];
  inputValue: string | number | undefined;
  handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  selectValue: string | number | undefined;
};

const BaseCurrency: React.FC<BaseCurrencyProps> = ({
  options,
  inputValue,
  handleInputChange,
  handleSelectChange,
  selectValue,
}) => {
  return (
    <>
      <div className="group">
        <Input
          type="number"
          value={inputValue}
          handleChange={handleInputChange}
        />
        <Select
          value={selectValue}
          handleChange={handleSelectChange}
          options={options}
        />
      </div>
    </>
  );
};

export default React.memo(BaseCurrency);
