import { Box } from "@mui/material";
import { TreeViewComponent } from "@syncfusion/ej2-react-navigations";

const nodeTree = [
  { id: "functions", name: "Functions", children: [] },
  {
    id: "values",
    name: "Values",
    children: [
      { id: "string", name: "String", children: [] },
      { id: "number", name: "Number", children: [] },
      { id: "boolean", name: "Boolean", children: [] },
      { id: "array", name: "Array", children: [] },
      { id: "object", name: "Object", children: [] },
    ],
  },
];

const NodeToolbox = () => {
  const fields = {
    dataSource: nodeTree,
    id: "id",
    text: "name",
    child: "children",
  };

  return (
    <Box sx={{ height: "100%", width: "300px", border: "1px solid red" }}>
      <TreeViewComponent fields={fields} />
    </Box>
  );
};
export default NodeToolbox;
