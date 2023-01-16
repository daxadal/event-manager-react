/* eslint-disable no-console */
import { io } from "socket.io-client";
import { Reminder } from "../constants-types";

const socket = io(process.env.REACT_APP_SOCKET_URL as string);

export function socketSignIn(sessionToken: string): Promise<void> {
  return new Promise((resolve, reject) => {
    socket.emit("sign-in", sessionToken, (response: unknown) => {
      if (response === "sign-in-ok") resolve();
      else reject(new Error("Sign in error"));
    });
  });
}

export function socketSignOut(sessionToken: string): Promise<void> {
  return new Promise((resolve, reject) => {
    socket.emit("sign-out", sessionToken, (response: unknown) => {
      if (response === "sign-out-ok") resolve();
      else reject(new Error("Sign out error"));
    });
  });
}

let reminderListener: ((...args: unknown[]) => void) | undefined;

export function stopListeningReminders() {
  socket.removeListener("reminder", reminderListener);
  reminderListener = undefined;
}

export function listenReminders(callback: (reminder: Reminder) => void) {
  if (reminderListener) stopListeningReminders();
  reminderListener = (reminder) => {
    const parsedReminder = Reminder.parse(reminder);
    callback(parsedReminder);
  };
  socket.on("reminder", reminderListener);
}

// --------------

socket.on("connect", () => {
  console.debug("Client: Connection made to server: ", socket.id);
});

socket.on("disconnect", () => {
  console.debug("Client: disconnected");
});

socket.on("reminder", (reminder) => {
  console.debug("Client reminder: ", reminder.message);
});

socket.on("sign-in-ok", () => {
  console.debug("Client sign-in-ok");
});

socket.on("sign-in-error", () => {
  console.error("Client sign-in-error");
});

socket.on("sign-out-ok", () => {
  console.debug("Client sign-out-ok");
});

socket.on("sign-out-error", () => {
  console.error("Client sign-out-error");
});
