import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Toolbar from "./Toolbar";

export default {
  title: "Components/Base/Toolbar",
  component: Toolbar,
  args: { height: 80 },
} as ComponentMeta<typeof Toolbar>;

const Template: ComponentStory<typeof Toolbar> = (args) => (
  <Toolbar {...args}>
    <button type="button">Button</button>
    <h2>Title</h2>
  </Toolbar>
);

export const Default = Template.bind({});
