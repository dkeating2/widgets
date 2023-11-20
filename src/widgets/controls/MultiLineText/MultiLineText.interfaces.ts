import { ErrorT, IBaseControl } from "../../widgets.interfaces";

export interface MultiLineTextProps extends IBaseControl<string> {
  label?: string;
  placeholder?: string;
  variant?: "outlined" | "filled" | "standard";
  error?: ErrorT;
}
