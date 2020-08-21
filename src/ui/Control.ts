import styled, { css } from "styled-components/macro";
import theme from "../lib/theme";
export interface ControlProps {
  control?: "gridGap";
}
export const Control = styled.div<ControlProps>`
  display: grid;
  grid-row-gap: ${({ theme }) => theme.space[2]}px;
  grid-template-rows: 1fr;
  grid-template-columns: 120px 1fr 39px;
  margin-bottom: ${({ theme }) => theme.space[4]}px;
  padding: ${({ theme }) => theme.space[2]}px;

  legend {
    grid-row: 1/2;
    grid-column: 1/-1;
  }

  input,
  select,
  .remove-entry {
    font-weight: bold;
  }

  .add-entry {
    grid-row: 2 / 3;
    grid-column: 1/-1;
    font-size: 90%;
  }

  .remove-entry {
    grid-column: 3 / 4;
    /* border-color: ${({ theme }) => theme.colors.secondary}; */
    border-style: solid;
    border-width: 1px;
    border-right-style: solid;
    border-bottom-style: solid;
    border-radius: 0 4px 4px 0;

    &:disabled {
     opacity: 0.5;
     svg {
       color: var(--color-muted);
     }
    }

    &:hover {
      svg {
        color: var(--color-text);
      }
      background-color: var(--color-red);
      &:disabled {
        background-color: var(--color-gray);
      }
    }
  }

  input {
    grid-column: 1 / 2;
    border-radius: 4px 0 0 4px;
  }

  .select {
    grid-column: 2 / 3;
    select {
      border-radius: 0;
    }
  }

  input,
  .select {
    text-indent: 4px;
    &:focus {
      color: var(--color-yellow);
    }
  }
  ${(props) =>
    props &&
    props.control === "gridGap" &&
    css`
      .select {
        grid-column: 2 / 4;
        select {
          border-radius: 0 4px 4px 0;
        }
      }
    `}
`;

Control.defaultProps = { theme };
