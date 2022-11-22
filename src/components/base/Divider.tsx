import React from "react";
import styled, { css } from "styled-components";

interface DividerProps {
  vertical?: boolean;
}

const StyledDiv = styled.div<DividerProps>`
  background-color: ${(props) => props.theme.neutral.border};
  margin: 16px;

  ${(props) =>
    props.vertical
      ? css`
          display: inline-block;
          width: 1px;
        `
      : css`
          display: block;
          clear: both;
          width: 100%;
          min-width: 100%;
          height: 1px;
          align-self: center;
        `}
`;

export default function Divider(props: DividerProps) {
  const { vertical } = props;
  return <StyledDiv role="separator" vertical={vertical} />;
}
