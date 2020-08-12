import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  input,
  select {
    border-radius: ${({ theme }) => theme.space[1]}px;
  }

  html {
    overflow: unset !important;
    color: ${({ theme }) => theme.colors.text};
    font-family: ${({ theme }) => theme.fonts.body};
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
