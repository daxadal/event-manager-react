import React from "react";

import Card from "./base/Card";
import {
  checkEnumExhausted,
  Event,
  EventState,
} from "../services/constants-types";
import { Color } from "../themes";

const formatDate = (date: Date) =>
  date.toLocaleDateString("es-ES", {
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

interface EventCardProps {
  event: Event;
}

export default function EventCard(props: EventCardProps) {
  const { event } = props;

  function getColor(state: EventState): Color {
    switch (state) {
      case EventState.PUBLIC:
        return "green";
      case EventState.PRIVATE:
        return "cyan";
      case EventState.DRAFT:
        return "yellow";
      default:
        return checkEnumExhausted(state);
    }
  }
  return (
    <Card
      title={event.headline}
      center={<p>{event.description || "No description"}</p>}
      leftCorner={<p>{event.state}</p>}
      rightCorner={<p>{formatDate(event.startDate)}</p>}
      color={getColor(event.state)}
    />
  );
}
