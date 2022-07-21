import React from "react";
import styled from "styled-components";

interface HeaderProps {
  height: number;
}

const StyledHeader = styled.header<HeaderProps>`
  box-sizing: border-box;

  position: fixed;
  top: 0;
  left: 0;

  height: ${(props) => props.height}px;
  width: 100%;
  overflow: hidden;

  background-color: ${(props) => props.theme.foreground};
  border-bottom: 1px solid ${(props) => props.theme.border};
`;

const StyledNav = styled.nav`
  box-sizing: border-box;
  height: 100%;
  width: 100%;

  display: flex;
  flex-wrap: wrap;
  align-items: center;
`;

interface ToolbarProps extends HeaderProps, React.PropsWithChildren {
  className?: string;
}

export default function Toolbar(props: ToolbarProps) {
  const { className, height, children } = props;
  return (
    <StyledHeader height={height}>
      <StyledNav className={className}>{children}</StyledNav>
    </StyledHeader>
  );
}
