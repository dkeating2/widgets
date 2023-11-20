export interface DisplayGridProps {
  displayType: "container" | "container item" | "item";
  width?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  spacing?: number;
  columnSpacing?: number;
  rowSpacing?: number;
  children: React.ReactNode;
}
