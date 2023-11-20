import { useEffect, useCallback, useMemo } from "react";
import { Stack, Box } from "@mui/material";
import ReactFlow, {
  ReactFlowProvider,
  Panel,
  useNodesState,
  useEdgesState,
  useReactFlow,
  Controls,
  MiniMap,
  Background,
} from "reactflow";
import OutputNode from "./nodes/OutputNode";
import FnNode from "./nodes/FnNode";
import ValueNode from "./nodes/ValueNode";
import { useExpressionCompilerContext } from "../ExpressionCompiler.context";
import { stratify, tree } from "d3-hierarchy";

const nodeTypes = { output: OutputNode, fn: FnNode, value: ValueNode };

const ExpressionFlow = () => {
  const {
    state: { nodes, edges },
    methods: { onNodesChange, onEdgesChange, onConnect },
  } = useExpressionCompilerContext();

  return (
    <Box style={{ height: "100%", width: "100%" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
      >
        <Background />
        <Controls />
        <MiniMap />
      </ReactFlow>
      {JSON.stringify(edges)}
    </Box>
  );
};

export default function () {
  return (
    <ReactFlowProvider>
      <ExpressionFlow />
    </ReactFlowProvider>
  );
}
