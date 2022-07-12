import React from "react";
import styled from "styled-components";

type ValueType = string | number | readonly string[] | undefined;

interface InputProps {
  id: string;
  type: string;
  tagText: string;
  value: ValueType;
  onChange: (value: ValueType) => void;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const StyledLabel = styled.label`
  flex: 0 0 auto;
  align-self: center;
  padding: 8px;
`;

const StyledInput = styled.input`
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

export default function Input(props: InputProps) {
  const { id, type, tagText, value, onChange } = props;

  return (
    <Wrapper>
      <StyledLabel
        style={tagText ? undefined : { display: "hidden" }}
        htmlFor={id}
      >
        {tagText}
      </StyledLabel>
      <StyledInput
        id={id}
        type={type}
        value={value}
        onInput={(e) => onChange((e.target as HTMLInputElement).value)}
      />
    </Wrapper>
  );
}
