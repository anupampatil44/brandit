import { createTheme } from "@mui/material/styles";
import { green } from "@mui/material/colors";
import "./App.css";
const theme = createTheme({
  palette: {
    primary: {
      main: "#385A64",
    },
    secondary: {
      main: green[500],
    },
    typography: {
      h3: {
        fontFamily: "sans-serif",
      },
    },
  },
});

export default theme;
