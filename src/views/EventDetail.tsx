import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";

import Button from "../components/base/Button";
import Divider from "../components/base/Divider";
import Input from "../components/base/Input";

import { Event, EventData } from "../services/constants-types";
import { getEvent, updateEvent } from "../services/api/routes";
import { ModalOp } from "../reducers/modal-types";
import { ModalContext } from "./Root";

const TitleDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledForm = styled.form`
  background-color: ${(props) => props.theme.foreground};
  border-color: ${(props) => props.theme.border};
  color: ${(props) => props.theme.text};

  margin: 1rem auto;
  border: 1px solid;
  border-radius: 1rem;
  padding: 1rem;

  max-width: 500px;

  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

export default function EventDetail() {
  const { id } = useParams();

  const [event, setEvent] = useState<Partial<EventData>>({});
  const [location, setLocation] = useState<Partial<EventData["location"]>>({});

  const openModal = useContext(ModalContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) navigate("/events");
    else {
      getEvent(id).then((loadedEvent) => {
        setEvent(loadedEvent);
        setLocation(loadedEvent.location);
      });
    }
  }, [id, navigate]);

  async function submit() {
    if (!id) navigate("/events");
    else
      try {
        if (!event.headline || !event.startDate) {
          openModal({
            type: ModalOp.OPEN_ERROR_MODAL,
            message: "Fill out all the required fields",
          });
        } else {
          const { headline, description, startDate, state } = event;
          const responseEvent = await updateEvent(id, {
            headline,
            description,
            startDate,
            state,
            location,
          } as Event);

          setEvent(responseEvent);
          setLocation(responseEvent.location);

          openModal({
            type: ModalOp.OPEN_SUCCESS_MODAL,
            message: "Event updated",
          });
        }
      } catch (error) {
        openModal({
          type: ModalOp.OPEN_ERROR_MODAL,
          message: error.message || "An error occurred",
        });
      }
  }
  return (
    <>
      <TitleDiv>
        <h1>Event Detail</h1>
      </TitleDiv>
      <StyledForm
        onSubmit={(e) => {
          e.stopPropagation();
          e.preventDefault();
          submit();
        }}
      >
        <Input id="id" value={id} type="text" tagText="ID: " disabled />
        <Divider />

        <h2>Description</h2>
        <Input
          type="text"
          id="headline"
          tagText="Headline"
          value={event.headline}
          onChange={(value) => setEvent({ ...event, headline: value })}
        />
        <Input
          type="text"
          id="description"
          tagText="Description"
          value={event.description}
          onChange={(value) => setEvent({ ...event, description: value })}
        />
        <h2>Date</h2>
        <Input
          type="datetime-local"
          id="date"
          tagText="Start time"
          value={event.startDate?.toISOString().substring(0, 16)}
          onChange={(value) =>
            setEvent({
              ...event,
              startDate: value ? new Date(value) : undefined,
            })
          }
        />
        <Divider />

        <h2>Location</h2>
        <Input
          type="text"
          id="location-name"
          tagText="Location name"
          value={location.name}
          onChange={(value) => setLocation({ ...location, name: value })}
        />
        <Input
          type="text"
          id="location-latitude"
          tagText="Location latitude"
          value={location.lat}
          onChange={(value) => setLocation({ ...location, lat: Number(value) })}
        />
        <Input
          type="text"
          id="location-longitude"
          tagText="Location longitude"
          value={location.lon}
          onChange={(value) => setLocation({ ...location, lon: Number(value) })}
        />

        <Divider />

        <Button as="button" type="submit">
          Update event
        </Button>
      </StyledForm>
    </>
  );
}
