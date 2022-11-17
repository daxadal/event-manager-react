import { DefaultTheme } from "styled-components";

export interface ColorTheme {
  background: string;
  foreground: string;
  border: string;
  text: string;
}

export type Color = "neutral" | "cyan" | "green" | "purple" | "yellow" | "red";

export type AugmentedDefaultTheme = Record<Color, ColorTheme>;

declare module "styled-components" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface DefaultTheme extends AugmentedDefaultTheme {}
}

export const lightTheme: DefaultTheme = {
  neutral: {
    background: "#fff",
    foreground: "#eee",
    border: "#aaa",
    text: "#000",
  },
  cyan: {
    background: "#0ff",
    foreground: "#0ee",
    border: "#0aa",
    text: "#077",
  },
  green: {
    background: "#0f0",
    foreground: "#0e0",
    border: "#0a0",
    text: "#070",
  },
  purple: {
    background: "#f0f",
    foreground: "#e0e",
    border: "#a0a",
    text: "#707",
  },
  yellow: {
    background: "#ff0",
    foreground: "#ee0",
    border: "#aa0",
    text: "#770",
  },
  red: {
    background: "#f00",
    foreground: "#e00",
    border: "#a00",
    text: "#700",
  },
};

export const darkTheme: DefaultTheme = {
  neutral: {
    background: "#000",
    foreground: "#333",
    border: "#666",
    text: "#fff",
  },
  cyan: {
    background: "#033",
    foreground: "#066",
    border: "#0aa",
    text: "#0ee",
  },
  green: {
    background: "#030",
    foreground: "#060",
    border: "#0a0",
    text: "#0e0",
  },
  purple: {
    background: "#303",
    foreground: "#606",
    border: "#a0a",
    text: "#e0e",
  },
  yellow: {
    background: "#330",
    foreground: "#660",
    border: "#aa0",
    text: "#ee0",
  },
  red: {
    background: "#300",
    foreground: "#600",
    border: "#a00",
    text: "#e00",
  },
};
