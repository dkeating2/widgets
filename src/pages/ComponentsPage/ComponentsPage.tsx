import { Stack } from "@mui/material";
import { z } from "zod";

import {
  RadioButtons,
  SingleLineText,
  MultiLineText,
  DatePicker,
  SelectDropdown,
  Select,
} from "../../widgets/controls";
import { DisplayGrid } from "../../widgets/display";
import { OptionT } from "../../widgets/controls/SelectDropdown/SelectDropdown.interfaces";
import fnMap from "../../libs/expression-compiler/functions";
import DisplayCard from "../../components/display/DisplayCard/DisplayCard";

const workspaceData = {
  id: "workspace",
  properties: {
    displayType: "container",
    children: [
      {
        id: "sections",
        properties: {
          children: [],
        },
        type: "dataInSections",
      },
      {
        id: "workspace",
        properties: {
          displayType: "container",
          children: [],
        },
        type: "grid",
      },
    ],
  },
  type: "grid",
};

const ComponentsPage = () => {
  return (
    <Stack spacing={2}>
      <RadioButtons
        options={[
          { label: "True", value: true },
          { label: "False", value: false },
        ]}
      />
      <DisplayCard
        title="Single Select"
        description="Single Select description"
      >
        <Select />
      </DisplayCard>
      <DisplayCard title="Multi Select" description="Multi Select description">
        <Select />
      </DisplayCard>
      <DisplayCard title="Date Picker" description="Date Picker description">
        <DatePicker />
      </DisplayCard>
      <DisplayCard
        title="Single Line Text"
        description="Single line text description"
      >
        <SingleLineText label="Single Line Text" />
      </DisplayCard>
      <DisplayCard title="Number Input" description="Number input description">
        <SingleLineText label="Number Input" displayType="number" />
      </DisplayCard>
      <DisplayCard
        title="Currency Input"
        description="Currency input description"
      >
        <SingleLineText label="Currency Input" displayType="currency" />
      </DisplayCard>
      <DisplayCard
        title="Multiple Line Text"
        description="Multiple line text description"
      >
        <MultiLineText />
      </DisplayCard>
    </Stack>
  );
};

export default ComponentsPage;
