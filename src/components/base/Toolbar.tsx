import React from "react";
import styled from "styled-components";

interface HeaderProps {
  height: number;
}

const StyledHeader = styled.header<HeaderProps>`
  box-sizing: border-box;
  position: fixed;
  top: 0;
  height: ${(props) => props.height}px;
  width: 100%;
  overflow: hidden;
  background-color: var(--neutral-foreground);
  border-bottom: 1px solid var(--neutral-detail);
`;

const StyledNav = styled.nav`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;

  padding: 1rem;
  width: 100%;
`;

interface ToolbarProps extends HeaderProps, React.PropsWithChildren {}

export default function Toolbar(props: ToolbarProps) {
  const { height, children } = props;
  return (
    <StyledHeader height={height}>
      <StyledNav>{children}</StyledNav>
    </StyledHeader>
  );
}
