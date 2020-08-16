import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  aside::-webkit-scrollbar {
    width: 7px;
  }
  aside::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 10px;
  }
  aside::-webkit-scrollbar-track {
    background: var(--color-background);
    border-radius: 10px;
  }
  a{

  -webkit-tap-highlight-color:rgba(0, 0, 0, 0);
  }

  html {
    -font-smoothing:antialiased;
    overflow: unset !important;
    color: ${({ theme }) => theme.colors.text};
    font-family: ${({ theme }) => theme.fonts.body};
    background-color: ${({ theme }) => theme.colors.background};
  }

  body {
    overflow-x: hidden;
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
