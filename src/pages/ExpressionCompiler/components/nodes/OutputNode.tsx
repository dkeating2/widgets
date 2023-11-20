import { useCallback } from "react";
import { Handle, Position } from "reactflow";
import { Card, CardContent, Typography } from "@mui/material";

const OutputNode = ({ data }) => {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);
  return (
    <>
      Output
      <Handle type="target" id="output-handle" position={Position.Bottom} />
    </>
  );
};
export default OutputNode;
