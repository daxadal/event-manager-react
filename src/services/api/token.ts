import { useState } from "react";

const TOKEN_KEY = "authentication-token";

const TOKEN_SET = "authentication-token-set";
const TOKEN_UNSET = "authentication-token-unset";

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

export function useTokenWatcher() {
  const [prevToken, setPrevToken] = useState<string | null>(null);
  const [currentToken, setToken] = useState<string | null>(
    localStorage.getItem(TOKEN_KEY)
  );

  window.addEventListener(TOKEN_SET, () => {
    setPrevToken(currentToken);
    setToken(getAuthenticationToken());
  });
  window.addEventListener(TOKEN_UNSET, () => {
    setPrevToken(currentToken);
    setToken(null);
  });

  return { currentToken, prevToken };
}
