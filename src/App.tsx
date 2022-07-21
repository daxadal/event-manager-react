import React, { StrictMode, useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import { Normalize } from "styled-normalize";

import GlobalStyle from "./GlobalStyle";
import { darkTheme, lightTheme } from "./themes";

import Toolbar from "./components/base/Toolbar";

import { ReactComponent as ThreeBarsIcon } from "./assets/three-bars.svg";

import PalletteSelector, { Pallettes } from "./components/PalletteSelector";

import { checkEnumExhausted } from "./services/constants-types";

const AppToolbar = styled(Toolbar)`
  display: flex;
  flex-direction: row;

  padding: 0px 16px;
`;

const ToolbarLeft = styled.div`
  flex: 1 1 0;
  justify-content: flex-start;

  display: flex;
  gap: 1rem;
  align-items: center;
`;

const ToolbarRight = styled.div`
  flex: 1 1 0;
  justify-content: flex-end;

  display: flex;
  gap: 1rem;
  align-items: center;
`;

const ContentPage = styled.div<{ marginTop: number }>`
  margin-top: ${(props) => props.marginTop}px;
  padding: 16px;
`;

export default function App() {
  const toolbarHeight = 80;
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  const [pallette, setPallette] = useState(Pallettes.DEFAULT);

  const getThemeFromPallette = (newPallette: Pallettes) => {
    switch (newPallette) {
      case Pallettes.LIGHT:
        return lightTheme;
      case Pallettes.DARK:
        return darkTheme;
      case Pallettes.DEFAULT:
        return prefersDark ? darkTheme : lightTheme;
      default:
        return checkEnumExhausted(newPallette);
    }
  };

  return (
    <StrictMode>
      <ThemeProvider theme={getThemeFromPallette(pallette)}>
        <Normalize />
        <GlobalStyle />

        <AppToolbar height={toolbarHeight}>
          <ToolbarLeft>
            <ThreeBarsIcon />
          </ToolbarLeft>
          <h1>Event Manager React</h1>
          <ToolbarRight>
            <PalletteSelector value={pallette} onChange={setPallette} />
          </ToolbarRight>
        </AppToolbar>

        <ContentPage marginTop={toolbarHeight}>{/* TODO */}</ContentPage>
      </ThemeProvider>
    </StrictMode>
  );
}
