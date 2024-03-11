import React, { ChangeEvent } from "react";

type SelectProps = {
  value: string | number | readonly string[] | undefined;
  handleChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  options: string[]; //for this project we only need currency names
};

const Select: React.FC<SelectProps> = ({ value, options, handleChange }) => {
  return (
    <>
      <select value={value} className="" onChange={handleChange}>
        <option disabled selected value={undefined}>
          --
        </option>
        {options.map((opt, i) => (
          <option key={`index-${i}`} value={opt}>
            {opt?.toUpperCase()}
          </option>
        ))}
      </select>
    </>
  );
};

export default Select;
