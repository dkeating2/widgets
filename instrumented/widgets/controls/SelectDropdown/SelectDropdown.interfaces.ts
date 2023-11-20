type OptionT = { label: string; value: string; options?: OptionT[] };

export interface SelectDropdownProps {
  options: OptionT[];
  multiple?: boolean;
  autoComplete?: boolean;
  displayShowAll?: boolean;
  displayClearAll?: boolean;
  nested?: boolean;
  nestingDirection?: "horizontal" | "vertical";
}
