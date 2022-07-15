import React from "react";
import styled from "styled-components";

import Button from "./Button";

const Mask = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.45);
`;

const Wrapper = styled.div`
  display: table;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  transition-delay: 0.05s;
`;

const InnerWrapper = styled.div`
  display: table-cell;
  vertical-align: middle;
`;

const ModalBody = styled.div`
  text-align: center;
  margin: 0 auto;
  background-color: ${(props) => props.theme.foreground};
  border: 1px solid ${(props) => props.theme.border};
  border-radius: 16px;
  transition: transform 0.2s ease-in-out;
  max-width: 560px;
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 32px;
  font-weight: 500;
  font-size: 1.125rem;
  line-height: 1;
  text-align: left;
`;

const Title = styled.h3`
  flex: 1 0 auto;
  text-align: center;
`;

const CloseButton = styled.span`
  vertical-align: center;
  cursor: pointer;
`;

const ModalContent = styled.div`
  background-color: ${(props) => props.theme.background};
  padding: 16px 32px;
`;

const ModalFooter = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-content: center;

  padding: 16px 32px;
`;

const StyledButton = styled(Button)`
  flex: 1 0 0;
`;

export interface ModalAction {
  text: string;
  onClick: () => void;
}

interface ModalProps {
  closeOnClickAway: boolean;
  hasCloseButton: boolean;
  onClose: () => void;

  title: string;
  imageSrc: string;
  imageAlt: string;
  content: string;
  actions: ModalAction[];
}

export default function Modal(props: ModalProps) {
  const {
    closeOnClickAway,
    hasCloseButton,
    onClose,

    title,
    imageSrc,
    imageAlt,
    content,
    actions,
  } = props;

  function onClickAway() {
    if (closeOnClickAway) {
      onClose();
    }
  }

  return (
    <Mask>
      <Wrapper>
        <InnerWrapper tabIndex={0} onClick={onClickAway}>
          <ModalBody onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <Title>{title}</Title>
              {hasCloseButton && (
                <div>
                  <CloseButton onClick={onClose}>Close</CloseButton>
                </div>
              )}
            </ModalHeader>

            <ModalContent>
              <img src={imageSrc} alt={imageAlt} />
              <p>{content}</p>
            </ModalContent>

            <ModalFooter>
              {actions.map((action) => (
                <StyledButton text onClick={action.onClick}>
                  {action.text}
                </StyledButton>
              ))}
            </ModalFooter>
          </ModalBody>
        </InnerWrapper>
      </Wrapper>
    </Mask>
  );
}
