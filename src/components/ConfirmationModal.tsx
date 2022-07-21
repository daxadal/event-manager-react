import React from "react";

import Modal from "./base/Modal";

import warningSvg from "../assets/warning.svg";

interface ConfirmationModalProps {
  message: string;

  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmationModal(props: ConfirmationModalProps) {
  const { message, onConfirm, onCancel } = props;

  return (
    <Modal
      closeOnClickAway={false}
      hasCloseButton={false}
      onClose={onCancel}
      title="Confirm action?"
      imageSrc={warningSvg}
      imageAlt="Warning"
      content={message}
      actions={[
        { text: "Cancel", onClick: onCancel },
        { text: "OK", onClick: onConfirm },
      ]}
    />
  );
}
