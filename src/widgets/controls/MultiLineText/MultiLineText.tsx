import { TextField } from "@mui/material";
import { MultiLineTextProps } from "./MultiLineText.interfaces";

const MultiLineText = (props: MultiLineTextProps) => {
  const {
    label,
    disabled,
    error,
    placeholder = "Type Here",
    variant = "outlined",
  } = props;
  return (
    <TextField
      className="MultiLineText"
      fullWidth
      multiline
      minRows={5}
      placeholder={placeholder}
      label={label}
      variant={variant}
      disabled={disabled}
      error={error}
    />
  );
};

export default MultiLineText;
