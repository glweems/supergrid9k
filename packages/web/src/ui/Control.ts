import styled, { css } from "styled-components/macro";
import theme from "../lib/theme";
export interface ControlProps {
  control?: "gridGap";
}
export const Control = styled.fieldset<ControlProps>`
  .elements {
    display: grid;
    grid-row-gap: var(--space-2);
    grid-template-rows: 1fr;
    grid-template-columns:
      [delete-start] auto [delete-end]
      repeat(2, 1fr);
    margin-bottom: var(--space-3);
  }

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
    grid-row: span 1;
    grid-column: delete;
    margin-right: var(--space-2);
    padding: 0;
    border-style: solid;
    border-width: 1px;
    border-right-style: solid;
    border-bottom-style: solid;

    svg {
      border-radius: 100%;
    }
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
    grid-row: span 1;
    grid-column: 2 / 3;
    border-radius: 4px 0 0 4px;
  }

  .select {
    grid-column: 3 / 4;
    select {
      border-radius: 0;
      border-radius: 0 4px 4px 0;
    }
  }

  input,
  .select {
    text-indent: 4px;
    &:focus {
      color: var(--color-yellow);
    }
  }
  ${({ name }) =>
    name === "gridGap" &&
    css`
      .select {
        grid-column: 3 / 4;
        select {
          border-radius: 0 4px 4px 0;
        }
      }
    `}
`;
Control.displayName = "GridEditorControl";
Control.defaultProps = { theme };
