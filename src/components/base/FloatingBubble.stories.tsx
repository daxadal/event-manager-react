import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import FloatingBubble from "./FloatingBubble";
import { ReactComponent as ThreeBarsIcon } from "../../assets/three-bars.svg";

export default {
  title: "Components/Base/FloatingBubble",
  component: FloatingBubble,
} as ComponentMeta<typeof FloatingBubble>;

const Template: ComponentStory<typeof FloatingBubble> = (args) => (
  <FloatingBubble {...args}>
    <ThreeBarsIcon />
  </FloatingBubble>
);

export const Default = Template.bind({});
Default.args = {
  size: 64,
  offset: 32,
};
