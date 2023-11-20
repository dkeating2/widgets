import { DisplayGridProps } from "./DisplayGrid.interfaces";
import { Grid } from "@mui/material";

const DisplayGrid = (props: DisplayGridProps) => {
  const {
    displayType,
    spacing = 3,
    columnSpacing,
    rowSpacing,
    width = 12,
    children,
  } = props;

  return (
    <Grid
      container={displayType.includes("container")}
      item={displayType.includes("item")}
      xs={width}
      columnSpacing={columnSpacing ?? spacing}
      rowSpacing={rowSpacing ?? spacing}
    >
      {children}
    </Grid>
  );
};
export default DisplayGrid;
