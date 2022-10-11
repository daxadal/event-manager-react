import React from "react";
import styled, { css } from "styled-components";

interface ContainerProps {
  text?: boolean;
  outlined?: boolean;
}

const Container = styled.button<ContainerProps>`
  display: flex;
  align-items: center;
  justify-content: center;

  color: ${(props) => props.theme.text};
  background-color: ${(props) => props.theme.background};

  box-sizing: border-box;
  border: 1px solid ${(props) => props.theme.border};
  border-radius: 4px;
  box-shadow: none;

  max-width: 100%;
  padding: 6px 16px;

  font-family: inherit;
  line-height: 1;
  text-shadow: none;

  cursor: pointer;
  transition: all 0.2s;
  user-select: none;

  &:hover,
  &:active {
    filter: brightness(85%);
  }

  &:focus {
    border: 1px solid ${(props) => props.theme.text};
  }

  ${(props) =>
    props.text &&
    css`
      border: none;

      &:not(:active, :hover) {
        background: transparent;
      }
    `}

  ${(props) =>
    props.outlined &&
    css`
      &:not(:active, :hover) {
        background: transparent;
      }
    `}
`;

interface ButtonProps extends React.PropsWithChildren, ContainerProps {
  as?: "a" | "button" | "label";
  onClick: () => void;
}

interface LinkProps extends React.PropsWithChildren, ContainerProps {
  as: React.FC;
  to: string;
}

export default function Button(props: ButtonProps | LinkProps) {
  const { as, children, outlined, text, ...other } = props;

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Container as={as || "button"} outlined={outlined} text={text} {...other}>
      {children}
    </Container>
  );
}
