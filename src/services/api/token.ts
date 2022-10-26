export const getAuthenticationToken = (): string | null =>
  localStorage.getItem("authenticationToken");

export const setAuthenticationToken = (token: string): void => {
  localStorage.setItem("authenticationToken", token);
};

export const unsetAuthenticationToken = (): void => {
  localStorage.removeItem("authenticationToken");
};
