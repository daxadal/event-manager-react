import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import EventCard from "./EventCard";
import { EventState } from "../services/constants-types";

export default {
  title: "Components/EventCard",
  component: EventCard,
  args: {
    event: {
      id: "1234567890abdcdef",
      headline: "Title",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
      startDate: new Date(1970, 1, 10, 13, 45),
      location: {
        name: "Location",
      },
      state: EventState.PUBLIC,
      creatorId: "1234567890abdcdef",
    },
  },
} as ComponentMeta<typeof EventCard>;

const Template: ComponentStory<typeof EventCard> = (args) => (
  <EventCard {...args} />
);

export const Default = Template.bind({});
Default.args = {};
