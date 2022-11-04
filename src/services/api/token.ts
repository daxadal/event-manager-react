import { useState } from "react";

const TOKEN_SET = "token-set";
const TOKEN_UNSET = "token-unset";

export function useAuthenticationWatcher() {
  const [isAuthenticated, setAuthenticated] = useState(false);

  window.addEventListener(TOKEN_SET, () => setAuthenticated(true));
  window.addEventListener(TOKEN_UNSET, () => setAuthenticated(true));

  return isAuthenticated;
}

export const getAuthenticationToken = (): string | null =>
  localStorage.getItem("authenticationToken");

export const setAuthenticationToken = (token: string): void => {
  localStorage.setItem("authenticationToken", token);
  window.dispatchEvent(new Event(TOKEN_SET));
};

export const unsetAuthenticationToken = (): void => {
  localStorage.removeItem("authenticationToken");
  window.dispatchEvent(new Event(TOKEN_UNSET));
};
