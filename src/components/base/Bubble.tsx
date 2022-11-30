import React from "react";
import styled from "styled-components";

import { Color } from "../../themes";

interface CircleProps {
  size: number;
  color: Color;
}

const Circle = styled.button<CircleProps>`
  height: ${(props) => props.size}px;
  width: ${(props) => props.size}px;

  box-sizing: border-box;
  border: 1px solid;
  border-radius: ${(props) => props.size / 2}px;
  box-shadow: none;

  border-color: ${(props) => props.theme[props.color].border};
  background-color: ${(props) => props.theme[props.color].foreground};
`;

interface BubbleProps extends CircleProps, React.PropsWithChildren {
  className?: string;
  onClick: () => void;
}

export default function Bubble(props: BubbleProps) {
  const { size, color, onClick, children, className } = props;
  return (
    <Circle size={size} color={color} onClick={onClick} className={className}>
      {children}
    </Circle>
  );
}
