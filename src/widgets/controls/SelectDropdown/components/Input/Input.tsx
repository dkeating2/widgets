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
import { useState, useRef } from "react";
import { useSelectDropdownContext } from "../../SelectDropdown.context";
import classes from "./Input.module.scss";

const InputStartAdornment = ({ typing }: { typing: boolean }) => {
  const {
    methods: { set, deselectItems, clear },
    state: { inputValue, dropdownOpen, idToOption, selectedOptions },
    inputRef,
    multiple,
  } = useSelectDropdownContext();
  const handleDeselect = (id: string) => deselectItems([id]);

  return multiple ? (
    selectedOptions.map((id: string) => {
      const label = idToOption[id]?.label;
      return <Chip label={label} onDelete={() => handleDeselect(id)} />;
    })
  ) : (
    <div hidden={typing}>{idToOption[selectedOptions[0]]?.label}</div>
  );
};

const InputEndAdornment = () => {
  const {
    methods: { set, clear },
    state: { dropdownOpen },
  } = useSelectDropdownContext();

  const handleClear = () => clear();
  const handleOpen = () => set({ path: "dropdownOpen", value: !dropdownOpen });

  return (
    <Stack
      spacing={1}
      direction="row"
      divider={<Divider orientation="vertical" flexItem />}
    >
      <IconButton size="small" onClick={handleClear}>
        <Close />
      </IconButton>
      <IconButton size="small" onClick={handleOpen}>
        <ArrowDropDown />
      </IconButton>
    </Stack>
  );
};

const Input = () => {
  const {
    methods: { set, deselectItems, clear },
    state: { inputValue, dropdownOpen, idToOption, selectedOptions },
    inputRef,
    multiple,
  } = useSelectDropdownContext();
  const [typing, setTyping] = useState(false);

  const handleChange = (e) =>
    set({ path: "inputValue", value: e.target.value });

  const handleFocus = () => setTyping(true);

  const handleBlur = () => {
    setTyping(false);
    // set({ path: "autocompleteOpen", value: false });
    // set({ path: "inputValue", value: "" });
  };

  return (
    <TextField
      ref={inputRef}
      variant="outlined"
      value={inputValue}
      onChange={handleChange}
      sx={{ width: "600px" }}
      onFocus={handleFocus}
      onBlur={handleBlur}
      InputProps={{
        classes,
        startAdornment: <InputStartAdornment typing={typing} />,
        endAdornment: <InputEndAdornment />,
      }}
    />
  );
};
export default Input;
