import { TextField } from "@mui/material";
import { SingleLineTextProps } from "./SingleLineText.interfaces";

const SingleLineText = (props: SingleLineTextProps) => {
  const { variant = "outlined" } = props;
  return <TextField className="SingleLineText" fullWidth variant={variant} />;
};

export default SingleLineText;
