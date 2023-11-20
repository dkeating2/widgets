export type OptionT = { label: string; value: string; options?: OptionT[] };
export type PathT = Array<string | number>;

export type ListboxOptionT = OptionT & {
  __id: string;
  parentId?: string;
  depth?: number;
  hasChildren?: boolean;
};

export interface SelectDropdownProps {
  value: string;
  onChange: (value: string) => void;
  options: OptionT[];
  multiple?: boolean;
  enableAutoComplete?: boolean;
  showSelectAll?: boolean;
  showClearAll?: boolean;
  showGroupHeaders?: boolean;
  nested?: boolean;
  nestingDirection?: "horizontal" | "vertical";
}

export interface SelectDropdownContextState {
  inputValue: string;
  dropdownOpen: boolean;
  autocompleteOpen: boolean;
  selectedOptions: string[];
  filteredOptions: ListboxOptionT[];
  idToOption: Record<string, OptionT>;
}

export interface SelectDropdownContextMethods {
  clear: () => SelectDropdownContextState;
  set: ({
    path,
    value,
  }: {
    path: string;
    value: any;
  }) => SelectDropdownContextState;
  selectItems: (id: string[]) => SelectDropdownContextState;
  deselectItems: (ids: string[]) => SelectDropdownContextState;
  filter: (searchTerm: string) => SelectDropdownContextState;
}

export interface ISelectDropdownContext extends SelectDropdownProps {
  inputRef: React.RefObject<HTMLInputElement>;
  autoCompleteOptions: ListboxOptionT[];
  state: SelectDropdownContextState;
  methods: SelectDropdownContextMethods;
}
