import React, { createContext, useReducer, useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import { Normalize } from "styled-normalize";
import { Outlet } from "react-router-dom";

import GlobalStyle from "../GlobalStyle";
import { darkTheme, lightTheme } from "../themes";

import Toolbar from "../components/base/Toolbar";
import PalletteSelector, { Pallettes } from "../components/PalletteSelector";
import InformationModal from "../components/InformationModal";
import ConfirmationModal from "../components/ConfirmationModal";

import { ReactComponent as ThreeBarsIcon } from "../assets/three-bars.svg";

import { checkEnumExhausted } from "../services/constants-types";
import modalReducer from "../reducers/modal-reducer";

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

const ModalContext = createContext({});

export default function Root() {
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

  const [modalConfiguration, setModalConfiguration] = useReducer(modalReducer, {
    showInfoModal: false,
    showConfirmModal: false,
  });

  return (
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

      <ContentPage marginTop={toolbarHeight}>
        <ModalContext.Provider value={setModalConfiguration}>
          <Outlet />
        </ModalContext.Provider>
      </ContentPage>

      {modalConfiguration.showInfoModal && (
        <InformationModal
          type={modalConfiguration.modalType}
          message={modalConfiguration.modalMessage}
          onClose={modalConfiguration.onModalClose}
        />
      )}
      {modalConfiguration.showConfirmModal && (
        <ConfirmationModal
          message={modalConfiguration.modalMessage}
          onCancel={modalConfiguration.onModalCancel}
          onConfirm={modalConfiguration.onModalConfirm}
        />
      )}
    </ThemeProvider>
  );
}
