import { forwardRef } from "react";
import { TextField, InputAdornment } from "@mui/material";
import { SingleLineTextProps } from "./SingleLineText.interfaces";
import { NumericFormat, NumericFormatProps } from "react-number-format";

import _ from "lodash";

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

const NumericFormatCustom = forwardRef<NumericFormatProps, CustomProps>(
  function NumericFormatCustom(props, ref) {
    const { onChange, ...other } = props;

    return (
      <NumericFormat
        {...other}
        getInputRef={ref}
        onValueChange={(values) => {
          onChange({
            target: {
              name: props.name,
              value: values.value,
            },
          });
        }}
        thousandSeparator
        valueIsNumericString
      />
    );
  }
);

const SingleLineText = (props: SingleLineTextProps) => {
  const {
    placeholder = "Type Here",
    error,
    label,
    disabled,
    displayType = "text",
    variant = "standard",
  } = props;
  return (
    <TextField
      fullWidth
      className="SingleLineText"
      label={label}
      placeholder={placeholder}
      variant={variant}
      disabled={disabled}
      error={!_.isNil(error)}
      InputProps={{
        inputComponent: displayType !== "text" && (NumericFormatCustom as any),
        startAdornment: displayType === "currency" && (
          <InputAdornment position="start">$</InputAdornment>
        ),
      }}
    />
  );
};

export default SingleLineText;
