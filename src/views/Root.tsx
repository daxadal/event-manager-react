import React, { createContext, useEffect, useReducer, useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import { Normalize } from "styled-normalize";
import { Link, Outlet } from "react-router-dom";

import GlobalStyle from "../GlobalStyle";
import { Color, darkTheme, lightTheme } from "../themes";

import Toolbar from "../components/base/Toolbar";
import Drawer, { Positions } from "../components/base/Drawer";
import Divider from "../components/base/Divider";
import Button from "../components/base/Button";
import Avatar from "../components/Avatar";
import PalletteSelector, { Pallettes } from "../components/PalletteSelector";
import InformationModal from "../components/InformationModal";
import ConfirmationModal from "../components/ConfirmationModal";
import Bubble from "../components/base/Bubble";
import Message from "../components/base/Message";

import { ReactComponent as ThreeBarsIcon } from "../assets/three-bars.svg";
import { ReactComponent as MessageIcon } from "../assets/message.svg";

import { checkEnumExhausted, UserData } from "../services/constants-types";
import modalReducer from "../reducers/modal-reducer";
import { ModalAction, ModalOp } from "../reducers/modal-types";
import {
  unsetAuthenticationToken,
  useAuthenticationWatcher,
} from "../services/api/token";
import { me, signOut } from "../services/api/routes";

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

  display: flex;
  flex-direction: column;
  align-items: stretch;

  max-width: 512px;
`;

const StyledBubble = styled(Bubble)`
  align-self: flex-end;
`;

const StyledMessageIcon = styled(MessageIcon)<{ color: Color }>`
  fill: ${(props) => props.theme[props.color].text};
`;

export const ModalContext = createContext<React.Dispatch<ModalAction>>(
  () => null
);

export default function Root() {
  const toolbarHeight = 80;
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  const isAuthenticated = useAuthenticationWatcher();
  const [user, setUser] = useState<UserData>();

  useEffect(() => {
    if (isAuthenticated) {
      me().then((userData) => setUser(userData));
    } else {
      setUser(undefined);
    }
  }, [isAuthenticated]);

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

  const [isMessagesOpen, setIsMessagesOpen] = useState(false);

  // FIXME: Load actual messages
  const [messages, setMessages] = useState([
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
  ]);

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

          {user ? (
            <p>
              Hi, {user.name}!<br />
              {`<${user.email}>`}
            </p>
          ) : (
            <Divider />
          )}

          {isAuthenticated ? (
            <Button
              text
              onClick={async () => {
                setIsDrawerOpen(false);
                await signOut();
                unsetAuthenticationToken();
              }}
            >
              Sign out
            </Button>
          ) : (
            <>
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
            </>
          )}

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
        </Drawer>
      )}

      <ContentPage marginTop={toolbarHeight}>
        <ModalContext.Provider value={setModalConfiguration}>
          <Outlet />
        </ModalContext.Provider>
      </ContentPage>

      <FloatingDiv offset={32}>
        {isMessagesOpen &&
          messages.map((message) => (
            <Message color="neutral">{message}</Message>
          ))}
        <StyledBubble
          size={64}
          color="neutral"
          onClick={() => setIsMessagesOpen((value) => !value)}
        >
          <StyledMessageIcon color="neutral" />
        </StyledBubble>
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
