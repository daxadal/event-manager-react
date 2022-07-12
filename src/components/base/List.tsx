import React from "react";
import styled from "styled-components";

interface StyledULProps {
  // eslint-disable-next-line react/no-unused-prop-types
  horizontal?: boolean;
}

const StyledUL = styled.ul<StyledULProps>`
  display: flex;
  flex-direction: ${(props) => (props.horizontal ? "row" : "column")};
  flex-wrap: nowrap;

  margin: 0;
  padding: 0;

  list-style: none;

  align-items: center;
  justify-content: center;
`;

interface ListProps extends StyledULProps, React.PropsWithChildren {}

export default function List(props: ListProps) {
  const { horizontal, children } = props;

  return <StyledUL horizontal={horizontal}>{children}</StyledUL>;
}
