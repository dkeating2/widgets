import { useCallback, useState } from "react";
import { Handle, Position } from "reactflow";
import { Card, Box, CardContent, Typography, TextField } from "@mui/material";

const ValueNode = ({ data }) => {
  const [value, setValue] = useState();
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);
  return (
    <Card>
      <Box sx={{ backgroundColor: "#ff9c00", height: "5px" }}></Box>
      <CardContent>
        <Handle type="source" position={Position.Top} />
        <TextField size="small" value={data.value} />
      </CardContent>
    </Card>
  );
};
export default ValueNode;
