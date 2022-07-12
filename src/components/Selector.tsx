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

const StyledSelector = styled.select`
  flex: 1 1 0;
  padding: 6px 16px;
  font-family: inherit;
  line-height: 1;
  border: 1px solid ${(props) => props.theme.border};
  border-radius: 8px;
  outline: none;

  color: ${(props) => props.theme.text};
  background-color: ${(props) => props.theme.foreground};

  &:focus {
    border-color: ${(props) => props.theme.text};
  }

  &[disabled] {
    background-color: ${(props) => props.theme.background};
  }
`;

interface SelectorProps extends React.PropsWithChildren {
  id: string;
  tagText?: string;
  multiple?: boolean;
  value: string;
  onChange: (value: string) => void;
}

export default function Input(props: SelectorProps) {
  const { id, tagText, multiple, value, onChange, children } = props;

  return (
    <Wrapper>
      <StyledLabel
        style={tagText ? undefined : { display: "hidden" }}
        htmlFor={id}
      >
        {tagText}
      </StyledLabel>
      <StyledSelector
        id={id}
        multiple={Boolean(multiple)}
        value={value}
        onInput={(e) => onChange((e.target as HTMLSelectElement).value)}
      />
      {children}
    </Wrapper>
  );
}
