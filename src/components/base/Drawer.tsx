import React from "react";
import styled, { css } from "styled-components";

export enum Positions {
  L = "left",
  R = "right",
}

interface StylingProps {
  isShowing: boolean;
  hasMask: boolean;

  width: number;
  topOffset: number;

  placement: string;
}

const Mask = styled.div<StylingProps>`
  display: ${(props) =>
    props.isShowing && props.hasMask ? undefined : "hidden"};

  position: fixed;
  overflow: hidden;
  left: 0;
  top: ${(props) => props.topOffset}px;

  box-sizing: border-box;

  width: 100%;
  height: 100%;

  background-color: rgba(black, 0.5);
`;

const Menu = styled.div<StylingProps>`
  display: ${(props) => (props.isShowing ? "flex" : "hidden")};
  flex-direction: column;

  position: fixed;
  overflow: auto;
  top: ${(props) => props.topOffset}px;
  ${(props) =>
    props.placement === Positions.L
      ? css`
          left: 0;
        `
      : css`
          right: 0;
        `}

  display: flex;

  box-sizing: border-box;
  padding: 32px;

  max-width: 100%;
  width: ${(props) => props.width}px;
  height: 100%;

  transition: transform 0.2s ease-in-out;
  transition-delay: 1s;

  background-color: ${(props) => props.theme.foreground};
  border: 1px solid ${(props) => props.theme.border};
`;

interface DrawerProps extends StylingProps, React.PropsWithChildren {
  closeOnClickAway: boolean;

  onClose: () => void;
}

export default function Drawer(props: DrawerProps) {
  const {
    closeOnClickAway,
    isShowing,
    hasMask,

    width,
    topOffset,
    placement,

    onClose,

    children,
  } = props;

  function onClickOnMask() {
    if (closeOnClickAway) {
      onClose();
    }
  }

  return (
    <aside>
      <Mask
        tabIndex={0}
        isShowing={isShowing}
        hasMask={hasMask}
        width={width}
        topOffset={topOffset}
        placement={placement}
        onClick={onClickOnMask}
      />
      <Menu
        isShowing={isShowing}
        hasMask={hasMask}
        width={width}
        topOffset={topOffset}
        placement={placement}
      >
        {children}
      </Menu>
    </aside>
  );
}
