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
    <h1 style={{ textAlign: "center", width: "100%" }}>Title</h1>
  </Toolbar>
);

export const Default = Template.bind({});
