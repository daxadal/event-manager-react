import { useState } from "react";

const TOKEN_KEY = "authentication-token";

const TOKEN_SET = "authentication-token-set";
const TOKEN_UNSET = "authentication-token-unset";

export function useAuthenticationWatcher() {
  const [isAuthenticated, setAuthenticated] = useState(
    localStorage.getItem("authenticationToken") !== null
  );

  window.addEventListener(TOKEN_SET, () => setAuthenticated(true));
  window.addEventListener(TOKEN_UNSET, () => setAuthenticated(false));

  return isAuthenticated;
}

export const getAuthenticationToken = (): string | null =>
  localStorage.getItem(TOKEN_KEY);

export const setAuthenticationToken = (token: string): void => {
  localStorage.setItem(TOKEN_KEY, token);
  window.dispatchEvent(new Event(TOKEN_SET));
};

export const unsetAuthenticationToken = (): void => {
  localStorage.removeItem(TOKEN_KEY);
  window.dispatchEvent(new Event(TOKEN_UNSET));
};
