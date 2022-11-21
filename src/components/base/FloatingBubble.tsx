import React from "react";
import styled from "styled-components";

interface CircleProps {
  size: number;
  offset: number;
}
const Circle = styled.button<CircleProps>`
  position: absolute;
  bottom: ${(props) => props.offset}px;
  right: ${(props) => props.offset}px;
  height: ${(props) => props.size}px;
  width: ${(props) => props.size}px;

  box-sizing: border-box;
  border: 1px solid;
  border-radius: 32px;
  box-shadow: none;

  color: ${(props) => props.theme.text};
  border-color: ${(props) => props.theme.border};
  background-color: ${(props) => props.theme.foreground};
`;

interface FloatingBubbleProps extends CircleProps, React.PropsWithChildren {
  onClick: () => void;
}

export default function FloatingBubble(props: FloatingBubbleProps) {
  const { size, offset, onClick, children } = props;
  return (
    <Circle size={size} offset={offset} onClick={onClick}>
      {children}
    </Circle>
  );
}
