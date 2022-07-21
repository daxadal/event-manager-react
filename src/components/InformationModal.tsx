import React from "react";

import Modal from "./base/Modal";

import successPng from "../assets/success.png";
import errorPng from "../assets/error.png";

import { checkEnumExhausted } from "../services/constants-types";

export enum ModalType {
  SUCCESS = "success",
  ERROR = "error",
  INFO = "info",
}

interface InformationModalProps {
  type: ModalType;
  message: string;

  onClose: () => void;
}

const getTitleAndImageFromType = (type: ModalType) => {
  switch (type) {
    case ModalType.SUCCESS:
      return { title: "Success", imageSrc: successPng, imageAlt: "Success" };
    case ModalType.ERROR:
      return { title: "Error", imageSrc: errorPng, imageAlt: "Error" };
    case ModalType.INFO:
      return { title: "Info", imageSrc: successPng, imageAlt: "Info" };
    default:
      return checkEnumExhausted(type);
  }
};

export default function InformationModal(props: InformationModalProps) {
  const { type, message, onClose } = props;

  const { title, imageSrc, imageAlt } = getTitleAndImageFromType(type);

  return (
    <Modal
      closeOnClickAway={false}
      hasCloseButton={false}
      onClose={onClose}
      title={title}
      imageSrc={imageSrc}
      imageAlt={imageAlt}
      content={message}
      actions={[{ text: "OK", onClick: onClose }]}
    />
  );
}
