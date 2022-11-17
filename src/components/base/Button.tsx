import React from "react";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
import { Color } from "../../themes";

interface ContainerProps {
  text: boolean;
  outlined: boolean;
  color: Color;
}

const Container = styled.button<ContainerProps>`
  display: flex;
  align-items: center;
  justify-content: center;

  color: ${(props) => props.theme[props.color].text};
  background-color: ${(props) => props.theme[props.color].background};

  box-sizing: border-box;
  border: 1px solid ${(props) => props.theme[props.color].border};
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
    border: 1px solid ${(props) => props.theme[props.color].text};
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

interface LabelLinkProps
  extends React.PropsWithChildren,
    Partial<ContainerProps> {
  as: "a" | "label";
  onClick?: () => void;
}

interface ButtonProps extends React.PropsWithChildren, Partial<ContainerProps> {
  as?: "button";
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
}

interface LinkProps extends React.PropsWithChildren, Partial<ContainerProps> {
  as: typeof Link;
  to: string;
  onClick?: () => void;
}

export default function Button(
  props: ButtonProps | LinkProps | LabelLinkProps
) {
  const { as } = props;
  if (as === "a" || as === "label") {
    const { onClick, color, children, text, outlined } = props;
    return (
      <Container
        as={as}
        onClick={onClick}
        color={color ?? "neutral"}
        text={text ?? false}
        outlined={outlined ?? false}
      >
        {children}
      </Container>
    );
  }
  if (!as || as === "button") {
    const { onClick, color, children, text, outlined, type } = props;
    return (
      <Container
        as={as ?? "button"}
        type={type ?? "button"}
        onClick={onClick}
        color={color ?? "neutral"}
        text={text ?? false}
        outlined={outlined ?? false}
      >
        {children}
      </Container>
    );
  }
  const { onClick, color, children, text, outlined, to } = props as LinkProps;
  return (
    <Container
      as={as}
      to={to}
      onClick={onClick}
      color={color ?? "neutral"}
      text={text ?? false}
      outlined={outlined ?? false}
    >
      {children}
    </Container>
  );
}
