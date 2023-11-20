import { Stack } from "@mui/material";
import {
  RadioButtons,
  SingleLineText,
  MultiLineText,
  DatePicker,
  SelectDropdown,
} from "../../widgets/controls";
const ComponentsPage = () => {
  return (
    <Stack spacing={2}>
      <RadioButtons
        options={[
          { label: "True", value: true },
          { label: "False", value: false },
        ]}
      />
      <SingleLineText />
      <MultiLineText />
      <DatePicker />
      <SelectDropdown />
    </Stack>
  );
};

export default ComponentsPage;
