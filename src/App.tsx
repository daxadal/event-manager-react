import React from "react";
import styled, { ThemeProvider } from "styled-components";
import { Normalize } from "styled-normalize";

import GlobalStyle from "./GlobalStyle";
import { lightTheme } from "./themes";

import Toolbar from "./components/base/Toolbar";

import { ReactComponent as ThreeBarsIcon } from "./assets/three-bars.svg";

const AppToolbar = styled(Toolbar)`
  display: flex;
  flex-direction: row;
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

  return (
    <ThemeProvider theme={lightTheme}>
      <Normalize />
      <GlobalStyle />

      <AppToolbar height={toolbarHeight}>
        <ToolbarLeft>
          <ThreeBarsIcon />
        </ToolbarLeft>
        <h1>Event Manager React</h1>
        <ToolbarRight />
      </AppToolbar>

      <ContentPage marginTop={toolbarHeight}>{/* TODO */}</ContentPage>
    </ThemeProvider>
  );
}
