import { createGlobalStyle } from "styled-components";
import normalize from "./normalize";

export default createGlobalStyle`
  ${normalize};
  input ,select{
    border-radius: ${({ theme }) => theme.space[1]}px;
  }

  html {
    overflow-y: unset;
    color: ${({ theme }) => theme.colors.text};
    background-color: ${({ theme }) => theme.colors.background};
  }

  pre {
    overflow-x: auto;
    text-overflow: scroll;
  }
`;
