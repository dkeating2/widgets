import { Box } from "@mui/material";
import { useExpressionCompilerContext } from "../ExpressionCompiler.context";
const SidePanel = () => {
  const { state } = useExpressionCompilerContext();

  return (
    <Box>
      <pre>{JSON.stringify(state, null, 2)}</pre>
    </Box>
  );
};
export default SidePanel;
