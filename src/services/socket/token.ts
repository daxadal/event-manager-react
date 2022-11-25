import { useState } from "react";

const TOKEN_KEY = "socket-token";

const TOKEN_SET = "socket-token-set";
const TOKEN_UNSET = "socket-token-unset";

export function useSocketWatcher() {
  const [isSocketConnected, setSocketConnected] = useState(false);

  window.addEventListener(TOKEN_SET, () => setSocketConnected(true));
  window.addEventListener(TOKEN_UNSET, () => setSocketConnected(false));

  return isSocketConnected;
}

export const getSocketToken = (): string | null =>
  localStorage.getItem(TOKEN_KEY);

export const setSocketToken = (token: string): void => {
  localStorage.setItem(TOKEN_KEY, token);
  window.dispatchEvent(new Event(TOKEN_SET));
};

export const unsetSocketToken = (): void => {
  localStorage.removeItem(TOKEN_KEY);
  window.dispatchEvent(new Event(TOKEN_UNSET));
};
