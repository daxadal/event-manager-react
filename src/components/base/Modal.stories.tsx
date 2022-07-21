import React, { useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Modal, { ModalAction } from "./Modal";
import successPng from "../../assets/success.png";

export default {
  title: "Components/Base/Modal",
  component: Modal,

  args: {
    closeOnClickAway: true,
    hasCloseButton: true,

    title: "Modal Title",
    imageSrc: successPng,
    imageAlt: "Success",
    content: "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum",
    actions: new Array(1).fill(undefined),
  },
  argTypes: {
    actions: {
      options: ["1 Option", "2 Options", "3 Options", "4 Options", "5 Options"],
      mapping: {
        "1 Option": new Array(1).fill(undefined),
        "2 Options": new Array(2).fill(undefined),
        "3 Options": new Array(3).fill(undefined),
        "4 Options": new Array(4).fill(undefined),
        "5 Options": new Array(5).fill(undefined),
      },
    },
  },
} as ComponentMeta<typeof Modal>;

const Template: ComponentStory<typeof Modal> = (args) => {
  const { actions, ...other } = args;

  const [isShowing, setShowing] = useState(true);
  const [infoText, setInfoText] = useState("No option clicked");

  function onActionClicked(i: number) {
    setShowing(false);
    setInfoText(`Option ${i} clicked`);
  }

  function handleClose() {
    setShowing(false);
    setInfoText("No option clicked");
  }

  const reworkedActions: ModalAction[] = actions.map((_, i) => ({
    text: `Button ${i + 1}`,
    onClick: () => onActionClicked(i + 1),
  }));

  return (
    <>
      <button type="button" onClick={() => setShowing(true)}>
        Open Modal
      </button>
      <p>{infoText}</p>
      {isShowing && (
        <Modal {...other} actions={reworkedActions} onClose={handleClose} />
      )}
    </>
  );
};

export const Closable = Template.bind({});

export const Unclosable = Template.bind({});
Unclosable.args = {
  closeOnClickAway: false,
  hasCloseButton: false,
};

export const TwoOptions = Template.bind({});
TwoOptions.args = {
  closeOnClickAway: false,
  hasCloseButton: false,

  actions: "2 Options",
};

export const ThreeOptions = Template.bind({});
ThreeOptions.args = {
  closeOnClickAway: false,
  hasCloseButton: false,

  actions: "3 Options",
};
