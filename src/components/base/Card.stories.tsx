import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Card from "./Card";

export default {
  title: "Components/Base/Card",
  component: Card,
  args: {
    title: "Title",
    center: (
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum
      </p>
    ),
  },
} as ComponentMeta<typeof Card>;

const Template: ComponentStory<typeof Card> = (args) => <Card {...args} />;

export const TextOnly = Template.bind({});
TextOnly.args = {};

export const WithLeft = Template.bind({});
WithLeft.args = {
  leftCorner: <p>Left</p>,
};

export const WithRight = Template.bind({});
WithRight.args = {
  rightCorner: <p>Right</p>,
};
export const WithBoth = Template.bind({});
WithBoth.args = {
  leftCorner: <p>Left</p>,
  rightCorner: <p>Right</p>,
};
