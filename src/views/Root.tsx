import React, { createContext, useReducer, useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import { Normalize } from "styled-normalize";
import { Link, Outlet } from "react-router-dom";

import GlobalStyle from "../GlobalStyle";
import { darkTheme, lightTheme } from "../themes";

import Toolbar from "../components/base/Toolbar";
import Drawer, { Positions } from "../components/base/Drawer";
import Divider from "../components/base/Divider";
import Button from "../components/base/Button";
import Avatar from "../components/Avatar";
import PalletteSelector, { Pallettes } from "../components/PalletteSelector";
import InformationModal from "../components/InformationModal";
import ConfirmationModal from "../components/ConfirmationModal";

import { ReactComponent as ThreeBarsIcon } from "../assets/three-bars.svg";

import { checkEnumExhausted } from "../services/constants-types";
import modalReducer from "../reducers/modal-reducer";
import { useAuthenticationWatcher } from "../services/api/token";

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

  const isAuthenticated = useAuthenticationWatcher();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

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
          <Button text onClick={() => setIsDrawerOpen((value) => !value)}>
            <ThreeBarsIcon />
          </Button>
        </ToolbarLeft>
        <h1>Event Manager React</h1>
        <ToolbarRight>
          <PalletteSelector value={pallette} onChange={setPallette} />
        </ToolbarRight>
      </AppToolbar>

      {isDrawerOpen && (
        <Drawer
          width={450}
          topOffset={toolbarHeight}
          position={Positions.L}
          onClose={() => setIsDrawerOpen(false)}
        >
          <Avatar size="160px" isAuthenticated={isAuthenticated} />

          <Divider />

          <Button text as={Link} to="/" onClick={() => setIsDrawerOpen(false)}>
            Home
          </Button>
          <Button
            text
            as={Link}
            to="/events"
            onClick={() => setIsDrawerOpen(false)}
          >
            Events
          </Button>

          <Divider />

          <Button
            text
            as={Link}
            to="/sign-in"
            onClick={() => setIsDrawerOpen(false)}
          >
            Sign in
          </Button>
          <Button
            text
            as={Link}
            to="/sign-up"
            onClick={() => setIsDrawerOpen(false)}
          >
            Sign up
          </Button>
        </Drawer>
      )}

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
