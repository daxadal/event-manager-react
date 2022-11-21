import React from "react";
import styled from "styled-components";

interface CircleProps {
  size: number;
}

const Circle = styled.button<CircleProps>`
  height: ${(props) => props.size}px;
  width: ${(props) => props.size}px;

  box-sizing: border-box;
  border: 1px solid;
  border-radius: ${(props) => props.size / 2}px;
  box-shadow: none;

  border-color: ${(props) => props.theme.border};
  background-color: ${(props) => props.theme.foreground};
`;

interface FloatingBubbleProps extends CircleProps, React.PropsWithChildren {
  onClick: () => void;
}

export default function Bubble(props: FloatingBubbleProps) {
  const { size, onClick, children } = props;
  return (
    <Circle size={size} onClick={onClick}>
      {children}
    </Circle>
  );
}
