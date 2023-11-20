import {
  useState,
  useRef,
  useMemo,
  useEffect,
  useContext,
  createContext,
} from "react";
import Fuse from "fuse.js";

import { useAutocomplete } from "@mui/base";
import { flattenOptions } from "./utils";
import {
  SelectDropdownProps,
  SelectDropdownContextState,
  ISelectDropdownContext,
  SelectDropdownContextMethods,
} from "./SelectDropdown.interfaces";
import _ from "lodash";

import { useMap, useMethods } from "react-use";
import { v4 as uuidv4 } from "uuid";

const SelectDropdownContext = createContext<ISelectDropdownContext | undefined>(
  undefined
);

export const useSelectDropdownContext = (): ISelectDropdownContext => {
  const ctx = useContext(SelectDropdownContext);
  if (!ctx)
    throw new Error(
      "useSelectDropdownContext must be used within a SelectDropdownProvider"
    );
  return useContext(SelectDropdownContext);
};

const SelectDropdownProvider = (
  props: { children: React.ReactNode } & SelectDropdownProps
) => {
  const { value, onChange, options, multiple, children } = props;

  const autoCompleteOptions = useMemo(() => {
    return flattenOptions(options);
  }, [options]);

  const fuse = new Fuse(autoCompleteOptions, {
    keys: ["label"],
  });

  const inputRef = useRef(null);

  const initialState: SelectDropdownContextState = {
    inputValue: "",
    dropdownOpen: false,
    autocompleteOpen: false,
    selectedOptions: [],
    filteredOptions: [],
    idToOption: _.keyBy(autoCompleteOptions, "__id"),
  };

  function createMethods(
    state: SelectDropdownContextState
  ): SelectDropdownContextMethods {
    return {
      clear() {
        return initialState;
      },
      set({ path, value }: { path: string; value: any }) {
        return _.set({ ...state }, path, value);
      },
      selectItems(itemIds: string[]) {
        return {
          ...state,
          selectedOptions: multiple
            ? _.uniq([...state.selectedOptions, ...itemIds])
            : itemIds,
        };
      },
      deselectItems(itemIds: string[]) {
        return {
          ...state,
          selectedOptions: state.selectedOptions.filter(
            (id) => !itemIds.includes(id)
          ),
        };
      },
      filter(searchTerm: string) {
        return {
          ...state,
          filteredOptions: fuse
            .search(searchTerm)
            .filter((item) => !state.selectedOptions.includes(item.item.__id)),
        };
      },
    };
  }

  const [state, methods] = useMethods(createMethods, initialState);

  useEffect(() => {
    if (state.inputValue) {
      methods.set({ path: "dropdownOpen", value: false });
      methods.set({ path: "autocompleteOpen", value: true });
      methods.filter(state.inputValue);
    } else {
      methods.set({ path: "autocompleteOpen", value: false });
      methods.set({ path: "filteredOptions", value: [] });
    }
  }, [state.inputValue, methods]);

  return (
    <SelectDropdownContext.Provider
      value={{
        ...props,
        inputRef,
        autoCompleteOptions,
        state,
        methods,
      }}
    >
      {children}
    </SelectDropdownContext.Provider>
  );
};
export default SelectDropdownProvider;
