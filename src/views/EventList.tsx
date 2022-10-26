import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import Button from "../components/base/Button";
import EventCard from "../components/EventCard";
import { getAllEvents } from "../services/api/routes";
import { Event } from "../services/constants-types";

const TitleDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TitleButtons = styled.div`
  box-sizing: border-box;
  width: 100%;
  padding: 0 32px;

  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

const CardsDiv = styled.div<{ columns: number }>`
  display: grid;
  grid-template-columns: repeat(${(props) => props.columns}, 1fr);
  row-gap: 1rem;
`;

const StyledLink = styled(Link)`
  display: flex;
`;

const StyledCard = styled(EventCard)`
  flex: 1 0 0;
`;

export default function EventList() {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    getAllEvents().then((evs) => setEvents(evs));
  }, []);

  return (
    <>
      <TitleDiv>
        <h1>Event list</h1>
        <TitleButtons>
          <Button as={Link} to="/events/new">
            Create event
          </Button>
        </TitleButtons>
      </TitleDiv>
      <CardsDiv columns={2}>
        {events.map((event) => (
          <StyledLink to={`/events/${event.id}`}>
            <StyledCard event={event} />
          </StyledLink>
        ))}
      </CardsDiv>
    </>
  );
}
