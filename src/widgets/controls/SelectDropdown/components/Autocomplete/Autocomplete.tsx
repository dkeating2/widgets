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
import { ListboxOptionT } from "../../SelectDropdown.interfaces";
import classes from "./Autocomplete.module.scss";
const Autocomplete = () => {
  const {
    inputRef,
    state: { idToOption, autocompleteOpen, filteredOptions },
    methods: { set, selectItems },
  } = useSelectDropdownContext();

  const autocompleteRef = useRef();

  const handleClick = (id: string) => {
    selectItems([id]);
    set({ path: "inputValue", value: "" });
  };

  const buildPath = (item) => {
    const path = [];
    let current = idToOption[item.__id];
    while (current) {
      path.unshift(current.label);
      current = idToOption[current.parentId];
    }
    return path.join(" >S ");
  };

  return (
    <Popper
      placement="bottom-start"
      anchorEl={inputRef.current}
      open={autocompleteOpen}
    >
      <Card
        className={classes.root}
        sx={() => {
          const parentWidth = inputRef?.current?.clientWidth;
          return {
            width: `calc(0.9*${parentWidth}px)`,
            marginLeft: `calc(0.05*${parentWidth}px)`,
          };
        }}
      >
        <List>
          {filteredOptions.length === 0 && (
            <ListItem>No Options Found</ListItem>
          )}
          {filteredOptions.map((item: ListboxOptionT) => {
            return (
              <ListItemButton
                className={classes.listItem}
                onClick={() => {
                  handleClick(item.item.__id);
                }}
              >
                {buildPath(item.item)}
              </ListItemButton>
            );
          })}
        </List>
      </Card>
    </Popper>
  );
};
export default Autocomplete;
