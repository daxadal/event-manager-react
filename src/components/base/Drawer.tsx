import React from "react";
import styled, { css } from "styled-components";

export enum Positions {
  L = "left",
  R = "right",
}

const Mask = styled.div<{ topOffset: number }>`
  position: fixed;
  overflow: hidden;
  left: 0;
  top: ${(props) => props.topOffset}px;

  box-sizing: border-box;

  width: 100%;
  height: calc(100% - ${(props) => props.topOffset}px);

  background-color: rgba(0, 0, 0, 0.2);
`;

const Menu = styled.div<MenuProps>`
  flex-direction: column;
  align-items: center;

  position: fixed;
  overflow: auto;
  top: ${(props) => props.topOffset}px;
  ${(props) =>
    props.position === Positions.L
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
  height: calc(100% - ${(props) => props.topOffset}px);

  transition: transform 0.2s ease-in-out;
  transition-delay: 1s;

  background-color: ${(props) => props.theme.foreground};
  border: 1px solid ${(props) => props.theme.border};
`;

interface MenuProps {
  width: number;
  topOffset: number;

  position: string;
}

interface DrawerProps extends MenuProps, React.PropsWithChildren {
  onClose: () => void;
}

export default function Drawer(props: DrawerProps) {
  const {
    width,
    topOffset,
    position,

    onClose,

    children,
  } = props;

  return (
    <aside>
      <Mask tabIndex={0} topOffset={topOffset} onClick={onClose} />
      <Menu width={width} topOffset={topOffset} position={position}>
        {children}
      </Menu>
    </aside>
  );
}
