import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  /* button,
  input,
  select {
    position: relative;
    display: inline-block;
    box-sizing: border-box;
    margin: 0 0.3em 0.3em 0;
    padding: 0.5em 1.4em 0.7em 1.4em;
    color: ${({ theme }) => theme.colors.oxfordBlue};
    font-weight: 400;
    text-align: center;
    text-transform: uppercase;
    text-decoration: none;
    vertical-align: top;
    background-color: ${({ theme }) => theme.colors.white};
    border: none;
    border-radius: 0.15em;
    box-shadow: inset 0 -0.6em 0 -0.35em;
    &:active {
      top: 0.4em;
    }
    &:hover {
      opacity: 0.9;
    }

    @media all and (max-width: 30em) {
      display: block;
      margin: 0.4em auto;
    }
    cursor: pointer;
    user-select: none;
    border-radius: 6px;
    appearance: none;
  } */
`;
