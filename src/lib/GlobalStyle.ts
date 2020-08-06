import { createGlobalStyle } from "styled-components";
import media from "styled-media-query";

export default createGlobalStyle`
  color: ${({ theme }) => theme.colors.blues[1]};
  html {
    color: ${({ theme }) => theme.colors.light};
    background-color: ${({ theme }) => theme.colors.dark};
  }

  body {
    height: 100vh;
    overflow: hidden;
    font-family: "Lato", "Lucida Grande", "Lucida Sans Unicode", Tahoma,
      Sans-Serif;
    overscroll-behavior-y: none;


    ${media.lessThan("medium")`
    height: unset;
    overflow: auto;
    `}
  }

  pre {
    overflow-x: auto;
    text-overflow: scroll;
  }
  code {
    font-size: 80%;
    white-space: nowrap;
  }

  select,
  button,
  input {
    padding: ${({ theme }) => theme.space.common};
    font-size: 16px;
    background-color: ${({ theme }) => theme.colors.lights[9]};
    border-color: ${({ theme }) => theme.colors.darks[7]};
    border-style: solid;
    border-width: 1px;
    border-radius: 0.375em;
  }

  input, select {
    text-indent: 3px;
  }

  select {
    cursor: pointer;
  }

  button {
    text-align: center;
    text-transform: uppercase;
      &:hover {
      background-color: ${({ theme }) => theme.colors.darks[1]};
    }
    &:focus {
      border-radius: 0.375em;
      outline: 2px solid ${({ theme }) => theme.colors.yellow};
    }
  }
`;
