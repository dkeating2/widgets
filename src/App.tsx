import { ThemeProvider, CssBaseline } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { ComponentsPage } from "./pages";
import theme from "./assets/theme";
import { registerLicense } from "@syncfusion/ej2-base";
import CompilerPage from "./pages/CompilerPage";
import ExpressionCompiler from "./pages/ExpressionCompiler/ExpressionCompiler";
import "@fontsource/open-sans/400.css";
import "@fontsource/open-sans/500.css";
import "@fontsource/open-sans/600.css";
import "@fontsource/open-sans/700.css";

import "./assets/styles/main.scss";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div style={{ height: "100vh", width: "100vw", padding: "3rem" }}>
          <ComponentsPage />
        </div>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;
