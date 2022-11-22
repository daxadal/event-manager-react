import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  :root {
    background-color: ${(props) => props.theme.neutral.background};
    border-color: ${(props) => props.theme.neutral.border};
    color: ${(props) => props.theme.neutral.text};
  }

  body {
    font: 14px Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
  }
  
  ol,
  ul {
    padding-left: 30px;
  }
`;
