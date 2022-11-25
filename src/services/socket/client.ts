/* eslint-disable no-console */
import { io } from "socket.io-client";
import { Reminder } from "../constants-types";

const socket = io(process.env.REACT_APP_SOCKET_URL as string);

export function socketSignIn(sessionToken: string): Promise<void> {
  return new Promise((resolve, reject) => {
    socket.on("sign-in-ok", () => resolve(undefined));
    socket.on("sign-in-error", () =>
      reject(new Error("Signed in successfully instead of failing"))
    );
    socket.emit("sign-in", sessionToken);
  });
}

export function socketSignOut(sessionToken: string): Promise<void> {
  return new Promise((resolve, reject) => {
    socket.on("sign-out-ok", () => resolve(undefined));
    socket.on("sign-out-error", () =>
      reject(new Error("Signed out successfully instead of failing"))
    );

    socket.emit("sign-out", sessionToken);
  });
}
export function listenReminders(callback: (reminder: Reminder) => void) {
  socket.on("reminder", (reminder) => {
    const parsedReminder = Reminder.parse(reminder);
    callback(parsedReminder);
  });
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
