export interface CoinOHLC {
  timestamp: number;
  open: number;
  high: number;
  low: number;
  close: number;
}

export interface ChartContainerProps {
  data: CoinOHLC[];
}

export type TimeInterval = '1h' | '4h' | '6h' | '1d';

export interface TimeIntervalConfig {
  days: number;
  label: string;
  interpolate?: (data: CoinOHLC[]) => CoinOHLC[];
}