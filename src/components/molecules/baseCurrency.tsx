import React, { ChangeEvent } from "react";

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

  handleSelectChange,
  selectValue,
}) => {
  return (
    <>
      {/* <div>
        Enter Amount:&nbsp;
        <Input
          type="number"
          value={inputValue}
          handleChange={handleInputChange}
        />
      </div> */}
      <div>
        Change Base:&nbsp;
        <Select
          value={selectValue}
          handleChange={handleSelectChange}
          options={options}
        />
      </div>
    </>
  );
};

export default BaseCurrency;
