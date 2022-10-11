import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Table from "./Table";

export interface Ingredient {
  id: number;
  name: string;
  type: string;
}

export default {
  title: "Components/Base/Table",
  component: Table,

  args: {
    data: [
      { id: 101, name: "Liquid dough", type: "start" },
      { id: 102, name: "Dense dough", type: "start" },
      { id: 103, name: "Raw muffin", type: "mid" },
      { id: 104, name: "Raw croissant", type: "mid" },
      { id: 106, name: "Muffin", type: "end" },
      { id: 107, name: "Croissant", type: "end" },
    ],
    columns: [
      { label: "ID", display: (row: Ingredient) => row.id },
      { label: "Name", display: (row: Ingredient) => row.name },
      { label: "Type", display: (row: Ingredient) => row.type },
    ],
  },
} as ComponentMeta<typeof Table<Ingredient>>;

const Template: ComponentStory<typeof Table<Ingredient>> = (args) => (
  <Table<Ingredient> {...args} />
);

export const Basic = Template.bind({});
Basic.args = {
  hasRowSelection: false,
};

export const WithCheckbox = Template.bind({});
WithCheckbox.args = {
  hasRowSelection: true,
};
