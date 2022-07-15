import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Button from "./Button";

export default {
  title: "Components/Base/Button",
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => (
  <Button {...args}>Button text</Button>
);

export const Default = Template.bind({});

export const TextOnly = Template.bind({});
TextOnly.args = {
  text: true,
};

export const Outlined = Template.bind({});
Outlined.args = {
  outlined: true,
};

export const ButtonLink = Template.bind({});
ButtonLink.args = {
  as: "a",
};

export const ButtonLabel = Template.bind({});
ButtonLink.args = {
  as: "label",
};
