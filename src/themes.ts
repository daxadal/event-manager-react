import { DefaultTheme } from "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    background: string;
    foreground: string;
    border: string;
    text: string;
  }
}

export const lightTheme: DefaultTheme = {
  background: "#fff",
  foreground: "#ddd",
  border: "#999",
  text: "#000",
};

export const darkTheme: DefaultTheme = {
  background: "#111",
  foreground: "#333",
  border: "#aaa",
  text: "#eee",
};
