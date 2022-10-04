import React, { useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import InformationModal, { ModalType } from "./InformationModal";

export default {
  title: "Components/InformationModal",
  component: InformationModal,
  args: { message: "This is a base information message" },
} as ComponentMeta<typeof InformationModal>;

const Template: ComponentStory<typeof InformationModal> = (args) => {
  const { type, message } = args;

  const [isShowing, setShowing] = useState(true);

  function handleClose() {
    setShowing(false);
  }

  return (
    <>
      <button type="button" onClick={() => setShowing(true)}>
        Open InformationModal
      </button>
      {isShowing && (
        <InformationModal type={type} message={message} onClose={handleClose} />
      )}
    </>
  );
};

export const InfoModal = Template.bind({});
InfoModal.args = {
  type: ModalType.INFO,
  message: "This is a base information message",
};

export const SuccessModal = Template.bind({});
SuccessModal.args = {
  type: ModalType.SUCCESS,
  message: "This is a base success message",
};

export const ErrorModal = Template.bind({});
ErrorModal.args = {
  type: ModalType.ERROR,
  message: "This is a base error message",
};
