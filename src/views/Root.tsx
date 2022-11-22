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
import { ReactComponent as MessageIcon } from "../assets/message.svg";

import { checkEnumExhausted } from "../services/constants-types";
import modalReducer from "../reducers/modal-reducer";
import { ModalAction, ModalOp } from "../reducers/modal-types";
import { useAuthenticationWatcher } from "../services/api/token";
import Bubble from "../components/base/Bubble";

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

const FloatingDiv = styled.div<{ offset: number }>`
  position: absolute;
  bottom: ${(props) => props.offset}px;
  right: ${(props) => props.offset}px;
`;

const StyledMessageIcon = styled(MessageIcon)`
  fill: ${(props) => props.theme.text};
`;

export const ModalContext = createContext<React.Dispatch<ModalAction>>(
  () => null
);

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
          <Button text onClick={() => setIsDrawerOpen((value) => !value)}>
            <Avatar size="32px" isAuthenticated={isAuthenticated} />
          </Button>
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

      <FloatingDiv offset={32}>
        <Bubble size={64} onClick={() => null}>
          <StyledMessageIcon />
        </Bubble>
      </FloatingDiv>

      {modalConfiguration.showInfoModal && (
        <InformationModal
          type={modalConfiguration.modalType}
          message={modalConfiguration.modalMessage}
          onClose={() => {
            modalConfiguration.onModalClose();
            setModalConfiguration({ type: ModalOp.CLOSE_MODAL });
          }}
        />
      )}
      {modalConfiguration.showConfirmModal && (
        <ConfirmationModal
          message={modalConfiguration.modalMessage}
          onCancel={() => {
            modalConfiguration.onModalCancel();
            setModalConfiguration({ type: ModalOp.CLOSE_MODAL });
          }}
          onConfirm={() => {
            modalConfiguration.onModalConfirm();
            setModalConfiguration({ type: ModalOp.CLOSE_MODAL });
          }}
        />
      )}
    </ThemeProvider>
  );
}
