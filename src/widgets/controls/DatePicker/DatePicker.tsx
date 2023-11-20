import { DateTimePicker as MUIDateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

import { DatePickerProps } from "./DatePicker.interfaces";

const DatePicker = (props: DatePickerProps) => {
  return (
    <MUIDateTimePicker
      className="DatePicker"
      slotProps={{ textField: { fullWidth: true } }}
    />
  );
};

export default DatePicker;
