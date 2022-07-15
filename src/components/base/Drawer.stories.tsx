import React, { useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Drawer, { Positions } from "./Drawer";

export default {
  title: "Components/Base/Drawer",
  component: Drawer,

  args: {
    width: 560,
    topOffset: 80,
  },
  argTypes: { placement: { options: [...Object.values(Positions)] } },
} as ComponentMeta<typeof Drawer>;

const Template: ComponentStory<typeof Drawer> = (args) => {
  const [isShowing, setShowing] = useState(true);

  return (
    <>
      <button type="button" onClick={() => setShowing(true)}>
        Open Drawer
      </button>
      {isShowing && (
        <Drawer {...args} onClose={() => setShowing(false)}>
          <ul>
            <li>Item one</li>
            <li>Item two</li>
            <li>Item three</li>
            <li>Item four</li>
          </ul>
        </Drawer>
      )}
    </>
  );
};

export const LeftDrawer = Template.bind({});
LeftDrawer.args = {
  placement: Positions.L,
};

export const RightDrawer = Template.bind({});
RightDrawer.args = {
  placement: Positions.R,
};
