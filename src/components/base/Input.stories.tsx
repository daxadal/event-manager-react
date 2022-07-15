import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Input from "./Input";

export default {
  title: "Components/Base/Input",
  component: Input,
  args: {
    id: "story-input",
    type: "text",
    placeholder: "Type something...",
  },
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />;

export const Text = Template.bind({});

export const Password = Template.bind({});
Password.args = {
  type: "password",
};

export const Number = Template.bind({});
Number.args = {
  type: "number",
};

export const Date = Template.bind({});
Date.args = {
  type: "date",
};

export const LabeledText = Template.bind({});
LabeledText.args = {
  tagText: "Field: ",
};
