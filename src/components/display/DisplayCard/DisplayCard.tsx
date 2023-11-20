import { useState } from "react";
import {
  Card,
  Box,
  Stack,
  Typography,
  Collapse,
  IconButton,
} from "@mui/material";
import { ExpandMore, ExpandLess } from "@mui/icons-material";
import { DisplayCardProps } from "./DisplayCard.interfaces";

const DisplayCard = (props: DisplayCardProps) => {
  const {
    title,
    description,
    actions,
    left,
    collapsible = false,
    defaultCollapseOpen = true,
    children,
  } = props;

  const [collapseOpen, setCollapseOpen] = useState(defaultCollapseOpen);
  const hasHeaderContent =
    title || description || actions || left || collapsible;
  return (
    <Card>
      <Box p={"2rem  3rem"}>
        {hasHeaderContent && (
          <Stack direction={"row"} ml={"-3rem"} alignItems={"flex-start"}>
            <Stack
              width="3rem"
              direction={"row"}
              pr="6px"
              justifyContent={"flex-end"}
            >
              {left}
            </Stack>
            <Box>
              <Typography variant="h3">{title}</Typography>
              {typeof description === "string" ? (
                <Typography variant="h6">{description}</Typography>
              ) : (
                description
              )}
            </Box>
            <Stack
              ml="auto"
              direction={"row"}
              alignItems={"center"}
              spacing={2}
            >
              {actions}
              {collapsible && (
                <IconButton
                  size="small"
                  onClick={() => {
                    setCollapseOpen(!collapseOpen);
                  }}
                >
                  {collapseOpen ? <ExpandLess /> : <ExpandMore />}
                </IconButton>
              )}
            </Stack>
          </Stack>
        )}
        <Collapse in={collapseOpen}>
          <Box mt={hasHeaderContent ? 3 : 0}>{children}</Box>
        </Collapse>
      </Box>
    </Card>
  );
};

export default DisplayCard;
