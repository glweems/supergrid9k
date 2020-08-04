import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  color: ${({ theme }) => theme.colors.blues[1]};
  html {
    color: ${({ theme }) => theme.colors.light};
    background-color: ${({ theme }) => theme.colors.dark};
  }

  body {
    font-family: "Lato", "Lucida Grande", "Lucida Sans Unicode", Tahoma,
      Sans-Serif;
  }

  pre {
    overflow-x: auto;
    text-overflow: scroll;
  }
  code {
    font-size: 80%;
    white-space: nowrap;
  }

  input {
    display: inline-block;
    text-rendering: auto;
    letter-spacing: normal;
    text-align: start;
    text-indent: 0px;
    text-shadow: none;
    word-spacing: normal;
    border-image: initial;
    cursor: text;
    appearance: auto;
  }

  select {
    display: inline-block;
    order: logical;
    box-sizing: border-box;
    overflow: visible !important;
    writing-mode: horizontal-tb;
    letter-spacing: normal;
    white-space: pre;
    text-rendering: auto;
    text-align: start;
    text-indent: 0px;
    text-shadow: none;
    word-spacing: normal;
    border-radius: 0px;
    border-image: initial;
    cursor: default;
    appearance: menulist;
  }

  button {
    text-align: center;
    text-transform: uppercase;
  }

  input,
  select {
    text-indent: 4px;
  }

  input,
  select,
  button {
    padding: ${({ theme }) => theme.space.common};
    font-size: 16px;
    background-color: ${({ theme }) => theme.colors.lights[9]};
    border-color: ${({ theme }) => theme.colors.darks[7]};
    border-style: solid;
    border-width: 2px;
    border-radius: 0.375em;
    &:hover {
      background-color: ${({ theme }) => theme.colors.light};
    }
    &:focus {
      border-radius: 0.375em;
      outline: 2px solid ${({ theme }) => theme.colors.yellow};
    }
  }

  button.icon {
    /* margin: 0; */
    padding: 0;
  }
`;
