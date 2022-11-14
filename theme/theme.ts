import { createTheme } from "@mui/material";
import { blue } from "@mui/material/colors";

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: { default: "black", paper: "black" },
    primary: { main: blue[500] },
  },
});
export const lightTheme = createTheme({ palette: { mode: "light" } });
