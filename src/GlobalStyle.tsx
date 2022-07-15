import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  :root {
    background-color: ${(props) => props.theme.background};
    border-color: ${(props) => props.theme.border};
    color: ${(props) => props.theme.text};
  }

  body {
    font: 14px "Century Gothic", Futura, sans-serif;
    margin: 20px;
  }
  
  ol,
  ul {
    padding-left: 30px;
  }
`;
