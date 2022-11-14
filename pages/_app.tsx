import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { darkTheme, lightTheme } from "../theme/theme";
import { EntryProvider } from "../context/entries";
import { UIContext, UIProvider } from "../context/ui";
import { useContext } from "react";
import { SnackbarProvider } from "notistack";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UIProvider>
      <AllProvider>
        <Component {...pageProps} />
      </AllProvider>
    </UIProvider>
  );
}

const AllProvider = ({ children }: { children: JSX.Element }) => {
  const { isDark } = useContext(UIContext);
  return (
    <>
      <SnackbarProvider>
        <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
          <EntryProvider>
            <CssBaseline />
            {children}
          </EntryProvider>
        </ThemeProvider>
      </SnackbarProvider>
    </>
  );
};

export default MyApp;
