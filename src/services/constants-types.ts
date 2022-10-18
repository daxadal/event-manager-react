/* eslint-disable import/prefer-default-export */

import { z } from "zod";

export function checkEnumExhausted(e: never): never {
  throw new Error(`Value ${e} not contemplated`);
}

// #region --- Events ---

export enum EventState {
  DRAFT = "draft",
  PRIVATE = "private",
  PUBLIC = "public",
}

export const Event = z.object({
  id: z.string(),
  headline: z.string(),
  description: z.string().optional(),
  startDate: z.date(),
  location: z.object({
    name: z.string().optional(),
    lat: z.number().optional(),
    lon: z.number().optional(),
  }),
  state: z.nativeEnum(EventState),
  creatorId: z.string(),
});

export type Event = z.infer<typeof Event>;

export const EventResponse = z.object({ event: Event });

export const EventListResponse = z.object({ events: z.array(Event) });

// #endregion --- Events ---

// #region --- Subscription ---

export const Subscription = z.object({
  id: z.string(),
  eventId: z.string(),
  subscriberId: z.string(),
  subscriptionDate: z.date(),
  comment: z.string().optional(),
});

export type Subscription = z.infer<typeof Subscription>;

export const SubscriptionResponse = z.object({ subscription: Subscription });

// #endregion --- Subscription ---

// #region --- User ---

export const User = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  hashedPassword: z.string(),
  sessionToken: z.string().optional(),
  socketId: z.string().optional(),
});

export type User = z.infer<typeof User>;

// #endregion --- User ---
