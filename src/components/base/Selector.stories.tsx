import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Selector from "./Selector";

export default {
  title: "Components/Base/Selector",
  component: Selector,
  args: {
    id: "story-selector",
  },
  argTypes: { onChange: { action: "onChange" } },
} as ComponentMeta<typeof Selector>;

const Template: ComponentStory<typeof Selector> = (args) => (
  <Selector {...args}>
    <option value="Text 1">Text 1</option>
    <option value="Text 2">Text 2</option>
    <option value={1}>Number 1</option>
    <option value={2}>Number 2</option>
  </Selector>
);

export const Simple = Template.bind({});

export const Multiple = Template.bind({});
Multiple.args = {
  multiple: true,
};

export const Labeled = Template.bind({});
Labeled.args = {
  tagText: "Field: ",
};
