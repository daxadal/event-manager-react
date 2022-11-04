import React, { useContext, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import Button from "../components/base/Button";
import Divider from "../components/base/Divider";
import Input from "../components/base/Input";

import { Event } from "../services/constants-types";
import { createEvent } from "../services/api/routes";
import { ModalOp } from "../reducers/modal-types";
import { ModalContext } from "./Root";

const TitleDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  margin: auto;
`;

export default function EventCreation() {
  const [event, setEvent] = useState<Partial<Event>>({
    startDate: new Date(),
  });
  const [location, setLocation] = useState<Partial<Event["location"]>>({});

  const openModal = useContext(ModalContext);
  const navigate = useNavigate();

  async function submit() {
    try {
      if (!event.headline || !event.startDate) {
        openModal({
          type: ModalOp.OPEN_ERROR_MODAL,
          message: "Fill out all the fields",
        });
      } else {
        const response = await createEvent({ ...event, location } as Event);
        openModal({
          type: ModalOp.OPEN_SUCCESS_MODAL,
          message: "Event created",
          onClose: () => navigate(`/events/${response.id}`),
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
        <h1>Event Creation</h1>
      </TitleDiv>
      <StyledForm
        onSubmit={(e) => {
          e.stopPropagation();
          e.preventDefault();
          submit();
        }}
      >
        <Input id="id" value="(not set)" type="text" tagText="ID: " disabled />
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
          Create event
        </Button>
      </StyledForm>
    </>
  );
}
