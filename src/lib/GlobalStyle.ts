import { createGlobalStyle } from "styled-components";
import normalize from "./normalize";
import { cssVariables } from "./theme";

export default createGlobalStyle`
  ${cssVariables};
  ${normalize};
  input,
  select {
    border-radius: ${({ theme }) => theme.space[1]}px;
  }

  html {
    overflow: unset !important;
    color: ${({ theme }) => theme.colors.text};
    background-color: ${({ theme }) => theme.colors.background};
  }

  pre {
    overflow-x: auto;
    text-overflow: scroll;
  }
  button,
  select {
    cursor: pointer;
  }
  input {
    cursor: text;
  }
`;
