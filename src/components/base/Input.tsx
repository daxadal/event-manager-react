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

interface InputStyleProps {
  isValid: boolean;
}

const StyledInput = styled.input<InputStyleProps>`
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

type HTMLInput = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onChange" | "onInput"
>;

interface InputProps extends HTMLInput, Partial<InputStyleProps> {
  id: string;
  type: React.HTMLInputTypeAttribute;
  tagText?: string;
  value?: HTMLInput["value"];
  placeholder?: string;
  onChange?: (value: string) => void;
}

export default function Input(props: InputProps) {
  const { id, type, tagText, value, placeholder, onChange, isValid } = props;

  return (
    <Wrapper>
      {tagText && <StyledLabel htmlFor={id}>{tagText}</StyledLabel>}
      <StyledInput
        id={id}
        type={type}
        value={value ?? ""}
        placeholder={placeholder}
        onInput={(e) => onChange?.((e.target as HTMLInputElement).value)}
        isValid={isValid ?? true}
      />
    </Wrapper>
  );
}
