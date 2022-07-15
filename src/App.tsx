import React from "react";
import { ThemeProvider } from "styled-components";
import { Normalize } from "styled-normalize";

import GlobalStyle from "./GlobalStyle";
import { lightTheme } from "./themes";

export default function App() {
  return (
    <ThemeProvider theme={lightTheme}>
      <Normalize />
      <GlobalStyle />
      {/* TODO */}
    </ThemeProvider>
  );
}
