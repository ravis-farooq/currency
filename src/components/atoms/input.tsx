import React, { ChangeEvent, HTMLInputTypeAttribute } from "react";

type InputProps = {
  type: HTMLInputTypeAttribute | undefined;
  value: string | number | readonly string[] | undefined;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

const Input: React.FC<InputProps> = ({ type, value, handleChange }) => {
  return (
    <>
      <input
        type={type}
        value={value}
        onChange={handleChange}
        inputMode={type === "number" ? "numeric" : undefined}
      />
    </>
  );
};

export default Input;
