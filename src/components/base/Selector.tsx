import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const StyledLabel = styled.label`
  flex: 0 0 auto;
  align-self: center;
  padding: 8px;
`;

interface SelectorStyleProps {
  isValid: boolean;
}

const StyledSelector = styled.select<SelectorStyleProps>`
  flex: 1 1 0;
  padding: 6px 16px;
  font-family: inherit;
  line-height: 1;
  border: 1px solid;
  border-radius: 8px;
  outline: none;

  color: ${(props) => props.theme.neutral.text};
  border-color: ${(props) =>
    props.isValid ? props.theme.neutral.border : props.theme.red.border};
  background-color: ${(props) => props.theme.neutral.foreground};

  &:focus {
    border-color: ${(props) =>
      props.isValid ? props.theme.neutral.text : props.theme.red.text};
  }

  &[disabled] {
    background-color: ${(props) => props.theme.neutral.background};
  }
`;

interface SelectorProps
  extends React.PropsWithChildren,
    Partial<SelectorStyleProps> {
  id: string;
  tagText?: string;
  multiple?: boolean;
  value?: string;
  onChange: (value: string) => void;
}

export default function Selector(props: SelectorProps) {
  const { id, tagText, multiple, value, onChange, children, isValid } = props;

  return (
    <Wrapper>
      {tagText && <StyledLabel htmlFor={id}>{tagText}</StyledLabel>}
      <StyledSelector
        id={id}
        multiple={Boolean(multiple)}
        value={value}
        onInput={(e) => onChange((e.target as HTMLSelectElement).value)}
        isValid={isValid ?? true}
      >
        {children}
      </StyledSelector>
    </Wrapper>
  );
}
