import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import List from "./List";

export default {
  title: "Components/Base/List",
  component: List,
} as ComponentMeta<typeof List>;

const Template: ComponentStory<typeof List> = (args) => (
  <List {...args}>
    <li>Item one</li>
    <li>Item two</li>
    <li>Item three</li>
    <li>Item four</li>
  </List>
);

export const Vertical = Template.bind({});
Vertical.storyName = "Vertical (default)";

export const Horizontal = Template.bind({});
Horizontal.args = {
  horizontal: true,
};
