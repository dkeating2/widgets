import { Stack, Box } from "@mui/material";
import ExpressionCompilerProvider from "./ExpressionCompiler.context";
import ReactFlow, { Controls, Background } from "reactflow";
import NodeToolbox from "./components/NodeToolbox";
import ExpressionFlow from "./components/ExpressionFlow";
import NodeEditor from "./components/NodeEditor";
import SidePanel from "./components/SidePanel";
import "./ExpressionCompiler.scss";

const ExpressionCompiler = () => {
  return (
    <ExpressionCompilerProvider>
      <Stack direction="row" height="100%">
        <NodeToolbox />
        <ExpressionFlow />
        <SidePanel />
      </Stack>
    </ExpressionCompilerProvider>
  );
};
export default ExpressionCompiler;
