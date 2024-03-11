import React from "react";
import { ButtonProps } from "../../types/atomictype";

const Button: React.FC<ButtonProps> = ({ handleClick, btnLabel }) => {
  return (
    <>
      <button onClick={handleClick}>{btnLabel}</button>
    </>
  );
};

export default Button;
