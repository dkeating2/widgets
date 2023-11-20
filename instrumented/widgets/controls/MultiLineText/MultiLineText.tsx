import { TextField } from "@mui/material";
import { MultiLineTextProps } from "./MultiLineText.interfaces";

const MultiLineText = (props: MultiLineTextProps) => {
  return (
    <TextField className="MultiLineText" fullWidth multiline minRows={5} />
  );
};

export default MultiLineText;
