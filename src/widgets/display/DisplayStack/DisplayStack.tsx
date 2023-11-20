import { DisplayStackProps } from "./DisplayStack.interfaces";
import { Stack } from "@mui/material";

const DisplayStack = (props: DisplayStackProps) => {
  const { orientation = "horizontal", spacing = 2, children } = props;
  return (
    <Stack
      direction={orientation === "horizontal" ? "row" : "column"}
      spacing={spacing}
    >
      {children}
    </Stack>
  );
};

export default DisplayStack;
