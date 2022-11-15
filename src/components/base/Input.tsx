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

const StyledInput = styled.input`
  flex: 1 1 0;
  padding: 6px 16px;
  font-family: inherit;
  line-height: 1;
  border: 1px solid ${(props) => props.theme.neutral.border};
  border-radius: 8px;
  outline: none;

  color: ${(props) => props.theme.neutral.text};
  background-color: ${(props) => props.theme.neutral.foreground};

  &:focus {
    border-color: ${(props) => props.theme.neutral.text};
  }

  &[disabled] {
    background-color: ${(props) => props.theme.neutral.background};
  }
`;

type HTMLInput = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onChange" | "onInput"
>;

interface InputProps extends HTMLInput {
  id: string;
  type: React.HTMLInputTypeAttribute;
  tagText?: string;
  value?: HTMLInput["value"];
  placeholder?: string;
  onChange?: (value: string) => void;
}

export default function Input(props: InputProps) {
  const { id, type, tagText, value, placeholder, onChange } = props;

  return (
    <Wrapper>
      {tagText && <StyledLabel htmlFor={id}>{tagText}</StyledLabel>}
      <StyledInput
        id={id}
        type={type}
        value={value ?? ""}
        placeholder={placeholder}
        onInput={(e) => onChange?.((e.target as HTMLInputElement).value)}
      />
    </Wrapper>
  );
}
