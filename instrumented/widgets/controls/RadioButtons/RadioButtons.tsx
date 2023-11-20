import { RadioGroup, Radio, FormControlLabel } from "@mui/material";
import { RadioButtonsProps } from "./RadioButtons.interfaces";

const RadioButtons = (props: RadioButtonsProps) => {
  const { orientation = "horizontal", options } = props;
  return (
    <>
      <RadioGroup className="RadioButtons" row={orientation === "horizontal"}>
        {options.map((option) => {
          return (
            <FormControlLabel
              value={option.value}
              control={<Radio />}
              label={option.label}
            />
          );
        })}
      </RadioGroup>
    </>
  );
};

export default RadioButtons;
