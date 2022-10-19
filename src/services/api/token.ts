import { useState } from "react";

export const [isUserAuthenticated, setUserAuthenticated] = useState(
  Boolean(localStorage.getItem("authenticationToken"))
);

export const getAuthenticationToken = (): string | null =>
  localStorage.getItem("authenticationToken");

export const setAuthenticationToken = (token: string): void => {
  localStorage.setItem("authenticationToken", token);
  setUserAuthenticated(true);
};

export const unsetAuthenticationToken = (): void => {
  localStorage.removeItem("authenticationToken");
  setUserAuthenticated(false);
};
