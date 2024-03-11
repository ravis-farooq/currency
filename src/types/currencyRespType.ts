export interface CurrencyExchangeType {
  success: boolean;
  fluctuation: boolean;
  start_date: Date;
  end_date: Date;
  base: string;
  rates: { [key: string]: Rate };
}

export interface Rate {
  start_rate: number;
  end_rate: number;
  change: number;
  change_pct: number;
}
