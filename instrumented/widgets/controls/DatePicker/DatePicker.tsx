import { DateTimePicker as MUIDateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

import { DatePickerProps } from "./DatePicker.interfaces";

const DatePicker = (props: DatePickerProps) => {
  return <MUIDateTimePicker className="DatePicker" />;
};

export default DatePicker;
