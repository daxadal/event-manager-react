import React, { useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import ConfirmationModal from "./ConfirmationModal";

export default {
  title: "Components/ConfirmationModal",
  component: ConfirmationModal,
  args: { message: "This is a base confirmation message" },
} as ComponentMeta<typeof ConfirmationModal>;

const Template: ComponentStory<typeof ConfirmationModal> = (args) => {
  const { message } = args;

  const [isShowing, setShowing] = useState(true);
  const [infoText, setInfoText] = useState("No option clicked");

  function handleConfirm() {
    setShowing(false);
    setInfoText("Clicked: confirmation");
  }

  function handleCancel() {
    setShowing(false);
    setInfoText("Clicked: cancel");
  }

  return (
    <>
      <button type="button" onClick={() => setShowing(true)}>
        Open ConfirmationModal
      </button>
      <p>{infoText}</p>
      {isShowing && (
        <ConfirmationModal
          message={message}
          onCancel={handleCancel}
          onConfirm={handleConfirm}
        />
      )}
    </>
  );
};

export const Default = Template.bind({});
Default.args = {
  message: "Are your sure you want to confirm this base message?",
};
