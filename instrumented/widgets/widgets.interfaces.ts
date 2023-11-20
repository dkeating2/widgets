export type DataT =
  | string
  | number
  | boolean
  | null
  | { [key: string]: DataT }
  | DataT[];

export type ErrorT = string | string[] | { [key: string]: string };

export type ColorT =
  | "primary"
  | "secondary"
  | "error"
  | "info"
  | "success"
  | "warning"
  | string;

export interface IBaseControl<T extends DataT> {
  value: T;
  onChange: (value: T) => void;
  error?: ErrorT;
  disabled?: boolean;
  required?: boolean;
}
