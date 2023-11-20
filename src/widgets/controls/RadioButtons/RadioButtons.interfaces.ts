import { IBaseControl, DataT } from "../../widgets.interfaces";

type OptionT = { label: string; value: string | boolean };

export interface RadioButtonsProps {
  orientation?: "vertical" | "horizontal";
  options: [OptionT, OptionT, ...OptionT[]];
}
