import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Bubble from "./Bubble";
import { ReactComponent as MessageIcon } from "../../assets/message.svg";

export default {
  title: "Components/Base/FloatingBubble",
  component: Bubble,
} as ComponentMeta<typeof Bubble>;

const Template: ComponentStory<typeof Bubble> = (args) => (
  <Bubble {...args}>
    <MessageIcon />
  </Bubble>
);

export const Default = Template.bind({});
Default.args = {
  size: 64,
  offset: 32,
};
