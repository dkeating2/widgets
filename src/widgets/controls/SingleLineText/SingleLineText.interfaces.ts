import { ErrorT, IBaseControl } from "../../widgets.interfaces";

export interface SingleLineTextProps extends IBaseControl<string> {
  displayType?: "text" | "number" | "currency";
  variant?: "outlined" | "filled" | "standard";
  label?: string;
  placeholder?: string;
  error?: ErrorT;
}
