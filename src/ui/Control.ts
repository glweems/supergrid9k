import styled, { css } from "styled-components";
import theme from "../lib/theme";
export interface ControlProps {
  control?: "gridGap";
}
export const Control = styled.div<ControlProps>`
  display: grid;
  grid-row-gap: ${({ theme }) => theme.space.common};
  grid-template-rows: 1fr;
  grid-template-columns: 120px 1fr 39px;
  margin-bottom: ${({ theme }) => theme.space[4]}px;

  .control-label {
    grid-row: 1/2;
    grid-column: 1/-1;
  }

  input,
  select,
  .remove-entry {
    font-weight: bold;
    border-color: ${({ theme }) => theme.colors.dark};
  }

  .add-entry {
    grid-row: 2 / 3;
    grid-column: 1/-1;
    font-size: 90%;
  }

  .remove-entry {
    grid-column: 3 / 4;
    border-color: ${({ theme }) => theme.colors.secondary};
    border-style: solid;
    border-width: 1px;
    border-radius: 0 4px 4px 0;

    &:disabled {
      color: ${({ theme }) => theme.colors.light};
      cursor: none;
    }

    &:not(:disabled):hover {
      color: ${({ theme }) => theme.colors.text};
      background-color: ${({ theme }) => theme.colors.red};
    }
  }

  input {
    grid-column: 1 / 2;
    border-right-color: ${({ theme }) => theme.colors.background};
    border-radius: 4px 0 0 4px;
  }

  .select {
    grid-column: 2 / 3;
    select {
      border-left-color: ${({ theme }) => theme.colors.background};
      border-radius: 0;
    }
  }

  input,
  .select {
    text-indent: 4px;
    &:focus {
      color: ${({ theme }) => theme.colors.yellow};
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
