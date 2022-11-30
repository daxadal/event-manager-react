import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Bubble from "./Bubble";
import { ReactComponent as MessageIcon } from "../../assets/message.svg";

export default {
  title: "Components/Base/Bubble",
  component: Bubble,
  argTypes: {
    color: {
      options: ["neutral", "cyan", "green", "purple", "yellow", "red"],
      control: { type: "select" },
    },
  },
} as ComponentMeta<typeof Bubble>;

const Template: ComponentStory<typeof Bubble> = (args) => <Bubble {...args} />;

export const Default = Template.bind({});
Default.args = {
  size: 64,
  color: "neutral",
};

export const WithIcon = Template.bind({});
WithIcon.args = {
  size: 64,
  color: "neutral",
  children: <MessageIcon />,
};
