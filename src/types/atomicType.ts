export type ButtonProps = {
  btnLabel: string;
  handleClick: () => void;
};

export interface FetchRateType {
  date: Date;
  [key: string]: Record<string, number>;
}
