// #region --- Events ---

import { del, get, post, put } from "./http-methods";
import {
  Event,
  EventData,
  EventListResponse,
  EventResponse,
  MeResponse,
  SignInData,
  SignResponse,
  SignUpData,
  Subscription,
  SubscriptionResponse,
  UserData,
} from "../constants-types";

export const getAllEvents = async (): Promise<Event[]> => {
  const response = await get("/events");
  return EventListResponse.parse(response).events;
};

export const getEvent = async (id: string): Promise<Event> => {
  const response = await get(`/events/${id}`);
  return EventResponse.parse(response).event;
};

export const createEvent = async (event: EventData): Promise<Event> => {
  const response = await post("/events", event);
  return EventResponse.parse(response).event;
};

export const updateEvent = async (
  id: string,
  event: EventData
): Promise<Event> => {
  const response = await put(`/events/${id}`, event);
  return EventResponse.parse(response).event;
};

export const deleteEvent = async (id: string): Promise<void> => {
  await del(`/events/${id}`);
};

// #endregion --- Events ---

// #region --- Subscription ---

export const subscribe = async (
  eventId: string,
  comment?: string
): Promise<Subscription> => {
  const response = await post(`/events/${eventId}/subscribe`, { comment });
  return SubscriptionResponse.parse(response).subscription;
};

// #endregion --- Subscription ---

// #region --- User ---

export const signIn = async (data: SignInData): Promise<string> => {
  const response = await post("/users/sign-in", data);
  return SignResponse.parse(response).token;
};

export const signUp = async (data: SignUpData): Promise<string> => {
  const response = await post("/users/sign-up", data);

  return SignResponse.parse(response).token;
};

export const signOut = async (): Promise<void> => {
  await post("/users/sign-out");
};

export const me = async (): Promise<UserData> => {
  const response = await get("/users/me");
  return MeResponse.parse(response).user;
};

// #endregion --- User ---
