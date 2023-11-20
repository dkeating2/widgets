import { useRef, useState, useEffect, useMemo } from "react";

import {
  TextField,
  IconButton,
  Box,
  Stack,
  Button,
  Chip,
  Card,
  Divider,
  Checkbox,
  Popover,
  List,
  Paper,
  Popper,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  Collapse,
} from "@mui/material";
import _ from "lodash";
import { ArrowDropDown, ArrowRight, Close } from "@mui/icons-material";
import { SelectDropdownProps, OptionT } from "./SelectDropdown.interfaces";
import { flattenOptions } from "./utils";
import { Portal, FocusTrap } from "@mui/base";
import Select from "react-select";
import { useHoverDirty } from "react-use";
import clsx from "clsx";
import SelectDropdownProvider, {
  useSelectDropdownContext,
} from "./SelectDropdown.context";
import "./SelectDropdown.scss";

import Input from "./components/Input/Input";
import Autocomplete from "./components/Autocomplete/Autocomplete";
import Listbox from "./components/Listbox/Listbox";
const SelectDropdownListboxItem = (props: any) => {
  const { item, depth } = props;
  const [expanded, setExpanded] = useState(false);
  const {
    methods,
    showSelectAll,
    state,
    autoCompleteOptions,
    multiple,
    nestingDirection,
  } = useSelectDropdownContext();

  const selected = state.selectedOptions.includes(item.__id);

  const handleSelect = () => {
    multiple || methods.set("dropdownOpen", false);
    if (selected) {
      methods.deselectItems([item.__id]);
    } else {
      methods.selectItems([item.__id]);
    }
  };

  const handleToggleExpand = (e) => {
    e.stopPropagation();
    // const portalElements = document.querySelectorAll(
    //   "#SelectDropdown-Popover-Portal > *"
    // );
    // _.drop(portalElements, depth - 1).forEach((el: Element) => {
    //   el.remove();
    // });
    // console.log(portalElements);
    setExpanded(!expanded);
  };

  return (
    <>
      <ListItemButton
        dense
        disableGutters
        disablePadding
        direction="row"
        justifyContent={"flex-start"}
        alignItems={"center"}
        onClick={handleSelect}
        sx={{ paddingLeft: showSelectAll && "10px" }}
      >
        {multiple && (
          <Checkbox
            checked={selected}
            sx={{ "& .MuiSvgIcon-root": { fontSize: 20 } }}
          />
        )}
        <Box mr={"4rem"}>{item.label}</Box>
        {item.hasChildren && (
          <IconButton size="small" onClick={handleToggleExpand}>
            {expanded && nestingDirection === "vertical" ? (
              <ArrowDropDown />
            ) : (
              <ArrowRight />
            )}
          </IconButton>
        )}
      </ListItemButton>

      {item.hasChildren && expanded && (
        <Portal
          disablePortal={nestingDirection === "vertical"}
          container={document.getElementById("SelectDropdown-Popover-Portal")}
        >
          <SelectDropdownListbox parentId={item.__id} depth={depth + 1} />
        </Portal>
      )}
    </>
  );
};

const SelectAllButton = (props: any) => {
  const { items } = props;
  const { state, methods, autoCompleteOptions, showSelectAll } =
    useSelectDropdownContext();

  const checkedState = useMemo(() => {
    const selectedIds = state.selectedOptions;
    const itemIds = items.map((item) => item.__id);
    const allSelected = itemIds.every((id) => selectedIds.includes(id));
    const someSelected = itemIds.some((id) => selectedIds.includes(id));

    if (allSelected) {
      return "checked";
    } else if (someSelected) {
      return "indeterminate";
    } else {
      return "unchecked";
    }
  }, [state.selectedOptions, items]);

  const handleClick = () => {
    if (checkedState === "checked") {
      methods.deselectItems(items.map((item) => item.__id));
    } else {
      methods.selectItems(items.map((item) => item.__id));
    }
  };
  return (
    <>
      <Stack
        justifyContent={"flex-start"}
        alignItems={"center"}
        direction="row"
        onClick={handleClick}
      >
        <Checkbox
          checked={checkedState === "checked"}
          indeterminate={checkedState === "indeterminate"}
          sx={{ "& .MuiSvgIcon-root": { fontSize: 22 } }}
        />
        {checkedState === "checked" ? "Unselect" : "Select"} All
      </Stack>
    </>
  );
};

const SelectDropdownListbox = (props: any) => {
  const { parentId, depth = 0 } = props;
  const {
    state,
    methods,
    autoCompleteOptions,
    showSelectAll,
    nestingDirection,
    showGroupHeaders,
    multiple,
  } = useSelectDropdownContext();

  const items = useMemo(() => {
    return autoCompleteOptions?.filter((item) => item.parentId === parentId);
  }, [autoCompleteOptions, parentId]);

  return (
    <List
      dense
      disablePadding
      sx={{
        paddingLeft: nestingDirection === "vertical" ? `${depth * 20}px` : 0,
      }}
    >
      {showGroupHeaders && (
        <>
          {state.idToOption[parentId]?.label ?? "Options"}
          <Divider />
        </>
      )}
      {multiple && showSelectAll && items.length > 1 && (
        <SelectAllButton items={items} />
      )}
      {items?.map((item) => {
        return <SelectDropdownListboxItem item={item} depth={depth} />;
      })}
    </List>
  );
};

const SelectDropdownPopover = (props: any) => {
  const {
    inputRef,
    showGroupHeaders,
    state,
    methods,
    showClearAll,
    nestingDirection,
    multiple,
  } = useSelectDropdownContext();

  return (
    <Popover
      anchorEl={inputRef.current}
      open={state.dropdownOpen}
      onClose={() => {
        methods.set("dropdownOpen", false);
      }}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
    >
      <div className="SelectDropdown__Popover">
        <Stack
          id="SelectDropdown-Popover-Portal"
          {...(nestingDirection === "vertical"
            ? {
                direction: "column",
              }
            : {
                direction: "row",
              })}
          divider={<Divider flexItem />}
          spacing={2}
        >
          <SelectDropdownListbox />
        </Stack>
        {showClearAll && multiple && (
          <>
            <Divider />
            <Button
              onClick={() => {
                methods.set("selectedOptions", []);
              }}
            >
              Clear All
            </Button>
          </>
        )}
      </div>
    </Popover>
  );
};

const ProviderValue = () => {
  const { state } = useSelectDropdownContext();
  return <pre>{JSON.stringify(state, null, 2)}</pre>;
};

const SelectDropdown = (props: SelectDropdownProps) => {
  const {
    options,
    multiple = true,
    enableAutoComplete = true,
    showSelectAll = true,
    showClearAll = true,
    nested = false,
    nestingDirection = "horizontal",
    showGroupHeaders = true,
  } = props;

  const autoCompleteOptions = useMemo(() => {
    return flattenOptions(options);
  }, [options]);

  return (
    <div className="SelectDropdown">
      <SelectDropdownProvider {...props} nestingDirection={nestingDirection}>
        <Input />
        <Listbox />
        <Autocomplete />
        <ProviderValue />

        <pre>{JSON.stringify(autoCompleteOptions, null, 2)}</pre>
      </SelectDropdownProvider>
    </div>
  );
};

export default SelectDropdown;
