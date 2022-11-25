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

export const EventData = z.object({
  headline: z.string(),
  description: z.string().optional(),
  startDate: z.string().transform((d) => new Date(d)),
  location: z.object({
    name: z.string().optional(),
    lat: z.number().optional(),
    lon: z.number().optional(),
  }),
  state: z.nativeEnum(EventState),
});

export type EventData = z.infer<typeof EventData>;

export const Event = EventData.augment({
  id: z.string(),
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
  subscriptionDate: z.string().transform((d) => new Date(d)),
  comment: z.string().optional(),
});

export type Subscription = z.infer<typeof Subscription>;

export const SubscriptionResponse = z.object({ subscription: Subscription });

// #endregion --- Subscription ---

// #region --- User ---

export type SignInData = {
  email: string;
  password: string;
};

export type SignUpData = { name: string } & SignInData;

export const SignResponse = z.object({
  token: z.string(),
});

// #endregion --- User ---

// #region --- Reminder ---

export const Reminder = z.object({
  message: z.string(),
  event: Event,
  subscription: z.object({
    subscriptionDate: z.string().transform((d) => new Date(d)),
    comment: z.string(),
  }),
});

export type Reminder = z.infer<typeof Reminder>;

// #endregion --- Reminder ---
