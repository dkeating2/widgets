import {
  IconButton,
  Box,
  Stack,
  Button,
  Divider,
  Checkbox,
  Popover,
  Card,
  Popper,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
} from "@mui/material";

import _ from "lodash";
import { ArrowDropDown, ArrowRight } from "@mui/icons-material";
import { Portal } from "@mui/base";
import { useState, useMemo } from "react";
import { useSelectDropdownContext } from "../../SelectDropdown.context";

import classes from "./Listbox.module.scss";

const ListboxOptionItem = ({ item, depth }: { item: any; depth: number }) => {
  const [expanded, setExpanded] = useState(false);
  const {
    multiple,
    nestingDirection,
    showSelectAll,
    state: { selectedOptions },
    methods: { set, deselectItems, selectItems },
  } = useSelectDropdownContext();

  const selected = selectedOptions.includes(item.__id);

  const handleSelect = () => {
    multiple || set({ path: "dropdownOpen", value: false });
    if (selected) {
      deselectItems([item.__id]);
    } else {
      selectItems([item.__id]);
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
      <ListItemButton onClick={handleSelect}>
        <ListItemIcon>
          {multiple && <Checkbox checked={selected} />}
        </ListItemIcon>
        <ListItemText>{item.label}</ListItemText>
        <ListItemSecondaryAction>
          {item.hasChildren && (
            <IconButton size="small" onClick={handleToggleExpand}>
              {expanded && nestingDirection === "vertical" ? (
                <ArrowDropDown />
              ) : (
                <ArrowRight />
              )}
            </IconButton>
          )}
        </ListItemSecondaryAction>
      </ListItemButton>

      {item.hasChildren && expanded && (
        <Portal
          disablePortal={nestingDirection === "vertical"}
          container={document.getElementById("SelectDropdown-Popover-Portal")}
        >
          <ListboxOptions parentId={item.__id} depth={depth + 1} />
        </Portal>
      )}
    </>
  );
};

const ListboxOptions = ({
  parentId,
  depth = 0,
}: {
  parentId?: string | null;
  depth?: number;
}) => {
  const {
    autoCompleteOptions,
    nestingDirection,
    showGroupHeaders,
    multiple,
    showSelectAll,
    state: { idToOption },
  } = useSelectDropdownContext();

  const items = useMemo(() => {
    return autoCompleteOptions?.filter((item) => item.parentId === parentId);
  }, [autoCompleteOptions, parentId]);

  return (
    <List
      sx={{
        paddingLeft: nestingDirection === "vertical" ? `${depth * 20}px` : 0,
        borderLeft: depth > 0 ? "1px solid red" : "none",
      }}
    >
      {items?.map((item) => {
        return <ListboxOptionItem item={item} depth={depth} />;
      })}
    </List>
  );
};

const SelectAllButton = ({ items }: { items: any[] }) => {
  const {
    state: { selectedOptions },
    methods: { selectItems, deselectItems },
  } = useSelectDropdownContext();

  const checkedState = useMemo(() => {
    const selectedIds = selectedOptions;
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
  }, [selectedOptions, items]);

  const handleClick = () => {
    (checkedState === "checked" ? deselectItems : selectItems)(
      items.map((item) => item.__id)
    );
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

const Listbox = () => {
  const {
    inputRef,
    showClearAll,
    nestingDirection,
    multiple,
    state: { dropdownOpen },
    methods: { set },
  } = useSelectDropdownContext();

  const handleClearAll = () => set({ path: "selectedOptions", value: [] });
  const handleClose = () => set({ path: "dropdownOpen", value: false });

  return (
    <Popper
      anchorEl={inputRef.current}
      open={dropdownOpen}
      placement="bottom-start"
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
        <ListboxOptions />
      </Card>
    </Popper>
  );
};
export default Listbox;
// return (
//   <Popper
//     anchorEl={inputRef.current}
//     open={dropdownOpen}
//     placement="bottom-start"
//   >
//     <Card
//       className={classes.root}
//       sx={() => {
//         const parentWidth = inputRef?.current?.clientWidth;
//         return {
//           width: `calc(0.9*${parentWidth}px)`,
//           marginLeft: `calc(0.05*${parentWidth}px)`,
//         };
//       }}
//     >
//       <Stack
//         id="SelectDropdown-Popover-Portal"
//         {...(nestingDirection === "vertical"
//           ? {
//               direction: "column",
//             }
//           : {
//               direction: "row",
//             })}
//         divider={<Divider flexItem />}
//         spacing={2}
//       >
//         <ListboxOptions />
//       </Stack>
//       {showClearAll && multiple && (
//         <>
//           <Divider />
//           <Button onClick={handleClearAll}>Clear All</Button>
//         </>
//       )}
//     </Card>
//   </Popper>
// );
