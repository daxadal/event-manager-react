import React from "react";
import styled, { css } from "styled-components";

interface ContainerProps {
  // eslint-disable-next-line react/no-unused-prop-types
  text: boolean;
  // eslint-disable-next-line react/no-unused-prop-types
  outlined: boolean;
}

type ButtonProps = React.PropsWithChildren & ContainerProps;

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

export default function Button(props: ButtonProps) {
  const { children, outlined, text } = props;

  return (
    <Container outlined={outlined} text={text}>
      {children}
    </Container>
  );
}
