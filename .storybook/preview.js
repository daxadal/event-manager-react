import { ThemeProvider } from "styled-components";
import { Normalize } from "styled-normalize";

import GlobalStyle from "../src/GlobalStyle";
import { darkTheme, lightTheme } from "../src/themes";

export const globalTypes = {
  theme: {
    name: "Theme",
    description: "Global theme for components",
    defaultValue: "light",
    toolbar: {
      icon: "circlehollow",
      // Array of plain string values or MenuItem shape (see below)
      items: ["light", "dark"],
      // Property that specifies if the name of the item will be displayed
      showName: true,
      // Change title based on selected value
      dynamicTitle: true,
    },
  },
};

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  backgrounds: {
    default: "neutral",
    values: [
      {
        name: "neutral",
        value: "#888888",
      },
      {
        name: "light",
        value: lightTheme.background,
      },
      {
        name: "dark",
        value: darkTheme.background,
      },
      {
        name: "red",
        value: "#aa3333",
      },
      {
        name: "green",
        value: "#33aa33",
      },
      {
        name: "blue",
        value: "#3333aa",
      },
    ],
  },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

const withTheme = (Story, context) => {
  const theme = context.globals.theme === "dark" ? darkTheme : lightTheme;
  return (
    <ThemeProvider theme={theme}>
      <Normalize />
      <GlobalStyle />
      <Story {...context} />
    </ThemeProvider>
  );
};

export const decorators = [withTheme];
