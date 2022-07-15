import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Divider from "./Divider";

export default {
  title: "Components/Base/Divider",
  component: Divider,
} as ComponentMeta<typeof Divider>;

const Template: ComponentStory<typeof Divider> = (args) => {
  const { vertical } = args;
  return (
    <div
      style={{
        display: "flex",
        flexDirection: vertical ? "row" : "column",
      }}
    >
      <p>Text one</p>
      <Divider {...args}>Button text</Divider>
      <p>Text two</p>
    </div>
  );
};

export const Horizontal = Template.bind({});
Horizontal.storyName = "Horizontal (default)";

export const Vertical = Template.bind({});
Vertical.args = {
  vertical: true,
};
