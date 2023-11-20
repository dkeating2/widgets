import { useMemo, useCallback, useEffect } from "react";
import { Handle, Position } from "reactflow";
import {
  Card,
  Box,
  CardContent,
  Typography,
  TextField,
  Stack,
} from "@mui/material";
import CustomHandle from "../handles/CustomHandle";
import { useNodeId } from "reactflow";

const FnNode = ({ data }) => {
  const nodeId = useNodeId();
  useEffect(() => {
    console.log(data.fn);
  }, []);

  const args = useMemo(() => {
    return data.fn.signature.parameters()._def.items;
  }, [data.fn]);

  return (
    <Card>
      <Handle type="source" id={`${nodeId}-output`} position={Position.Top} />
      <Box sx={{ backgroundColor: "blue", height: "5px" }} />
      <CardContent>{data.fn.name}</CardContent>
      <Stack direction="row" spacing={2}>
        {args.map((a, idx) => {
          return (
            <CustomHandle
              type="target"
              id={`${nodeId}-arg-${idx}`}
              position={Position.Bottom}
              inputType={a}
            />
          );
        })}
      </Stack>
    </Card>
  );
};
export default FnNode;
