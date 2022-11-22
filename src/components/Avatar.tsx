import React from "react";
import styled from "styled-components";

interface SpanProps {
  size: string;
  isAuthenticated: boolean;
}

const StyledSpan = styled.span<SpanProps>`
  display: inline-block;
  overflow: hidden;

  margin: 0;
  padding: 0;

  height: ${(props) => props.size};
  width: ${(props) => props.size};

  font-variant: tabular-nums;
  text-align: center;
  white-space: nowrap;

  vertical-align: middle;

  background-color: ${(props) =>
    props.isAuthenticated
      ? props.theme.green.background
      : props.theme.neutral.background};
  border-radius: 50%;
`;

interface SvgProps {
  isAuthenticated: boolean;
}

const StyledSvg = styled.svg<SvgProps>`
  display: inline-block;
  width: 80%;
  height: 80%;
  margin-bottom: 4px;
  vertical-align: middle;
  fill: ${(props) =>
    props.isAuthenticated ? props.theme.green.text : props.theme.neutral.text};
`;

interface AvatarProps extends SpanProps, SvgProps {}

export default function Avatar(props: AvatarProps) {
  const { size, isAuthenticated } = props;

  return (
    <StyledSpan size={size} isAuthenticated={isAuthenticated}>
      <StyledSvg
        isAuthenticated={isAuthenticated}
        viewBox="64 64 896 896"
        aria-label="avatar svg"
      >
        <path d="M858.5 763.6a374 374 0 0 0-80.6-119.5 375.63 375.63 0 0 0-119.5-80.6c-.4-.2-.8-.3-1.2-.5C719.5 518 760 444.7 760 362c0-137-111-248-248-248S264 225 264 362c0 82.7 40.5 156 102.8 201.1-.4.2-.8.3-1.2.5-44.8 18.9-85 46-119.5 80.6a375.63 375.63 0 0 0-80.6 119.5A371.7 371.7 0 0 0 136 901.8a8 8 0 0 0 8 8.2h60c4.4 0 7.9-3.5 8-7.8 2-77.2 33-149.5 87.8-204.3 56.7-56.7 132-87.9 212.2-87.9s155.5 31.2 212.2 87.9C779 752.7 810 825 812 902.2c.1 4.4 3.6 7.8 8 7.8h60a8 8 0 0 0 8-8.2c-1-47.8-10.9-94.3-29.5-138.2zM512 534c-45.9 0-89.1-17.9-121.6-50.4S340 407.9 340 362c0-45.9 17.9-89.1 50.4-121.6S466.1 190 512 190s89.1 17.9 121.6 50.4S684 316.1 684 362c0 45.9-17.9 89.1-50.4 121.6S557.9 534 512 534z" />
      </StyledSvg>
    </StyledSpan>
  );
}
