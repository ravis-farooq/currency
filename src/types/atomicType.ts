import { Rate } from "./currencyRespType";

export type ButtonProps = {
  btnLabel: string;
  handleClick: () => void;
};

export interface TableProps {
  data: { [key: string]: Rate };
  baseValue: number;
  baseCurrency: string;
  symbols: string[];
  handleRemoveCurrency: (currency: string) => void;
}
