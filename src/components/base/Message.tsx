import React from "react";
import styled from "styled-components";
import { Color } from "../../themes";

interface ContainerProps {
  color: Color;
}

const Container = styled.div<ContainerProps>`
  margin: 1rem;
  border: 1px solid;
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
  border-bottom-left-radius: 1rem;
  padding: 1rem;

  background-color: ${(props) => props.theme[props.color].foreground};
  border-color: ${(props) => props.theme[props.color].border};
  color: ${(props) => props.theme[props.color].text};

  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

const StyledP = styled.p`
  flex: 0 0 auto;
  text-align: justify;
`;

interface MessageProps
  extends Partial<ContainerProps>,
    React.PropsWithChildren {}

export default function Message(props: MessageProps) {
  const { children, color } = props;
  return (
    <Container color={color ?? "neutral"}>
      <StyledP>{children}</StyledP>
    </Container>
  );
}
