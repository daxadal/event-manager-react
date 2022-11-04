import React from "react";
import { Link } from "react-router-dom";
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

interface LabelLinkProps extends React.PropsWithChildren, ContainerProps {
  as: "a" | "label";
  onClick?: () => void;
}

interface ButtonProps extends React.PropsWithChildren, ContainerProps {
  as?: "button";
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
}

interface LinkProps extends React.PropsWithChildren, ContainerProps {
  as: typeof Link;
  to: string;
  onClick?: () => void;
}

export default function Button(
  props: ButtonProps | LinkProps | LabelLinkProps
) {
  const { as } = props;
  if (as === "a" || as === "label") {
    const { onClick, children, text, outlined } = props;
    return (
      <Container as={as} onClick={onClick} text={text} outlined={outlined}>
        {children}
      </Container>
    );
  }
  if (!as || as === "button") {
    const { onClick, children, text, outlined, type } = props;
    return (
      <Container
        as={as || "button"}
        type={type || "button"}
        onClick={onClick}
        text={text}
        outlined={outlined}
      >
        {children}
      </Container>
    );
  }
  const { onClick, children, text, outlined, to } = props as LinkProps;
  return (
    <Container
      as={as}
      to={to}
      onClick={onClick}
      text={text}
      outlined={outlined}
    >
      {children}
    </Container>
  );
}
