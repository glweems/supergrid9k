import { atom, selector } from "recoil";
import shortid from "shortid";
import { GridProps } from "styled-system";

export const availableUnits = [
  "fr",
  "%",
  "px",
  "vw",
  "vh",
  "em",
  "rem",
  "auto",
];

export const availableGridGapUnits = ["px", "em", "vh", "vw"];

const defaultInputProps = {
  min: 0,
  max: 100,
  step: 1,
  disabled: false,
  type: "number",
};

export type GridTemplateEntry = {
  id: string;
  amount: number;
  unit: string;
  props?: React.InputHTMLAttributes<HTMLInputElement>;
};

export interface GridState {
  gridTemplateRows: GridTemplateEntry[];
  gridTemplateColumns: GridTemplateEntry[];
  gridGap: GridTemplateEntry;
}

export const grid = atom<GridState>({
  key: "grid",
  default: {
    gridTemplateRows: [
      { id: shortid(), amount: 1, unit: "fr", props: defaultInputProps },
      { id: shortid(), amount: 1, unit: "fr", props: defaultInputProps },
      { id: shortid(), amount: 1, unit: "fr", props: defaultInputProps },
    ],
    gridTemplateColumns: [
      { id: shortid(), amount: 1, unit: "fr", props: defaultInputProps },
      { id: shortid(), amount: 1, unit: "fr", props: defaultInputProps },
      { id: shortid(), amount: 1, unit: "fr", props: defaultInputProps },
    ],
    gridGap: { id: shortid(), amount: 1, unit: "rem" },
  },
});

export const gridCss = selector<GridProps>({
  key: "gridCss",
  get: ({ get }) => {
    const {
      gridTemplateRows,
      gridTemplateColumns,
      gridGap: { amount, unit },
    } = get(grid);

    let cssObj: Record<string, string> = {
      display: "grid",
      gridGap: `${amount}${unit}`,
    };

    Object.entries({ gridTemplateRows, gridTemplateColumns }).forEach(
      ([key, value]: [string, GridTemplateEntry[]]) => {
        cssObj[key] = value
          .map(({ amount, unit }) => `${amount}${unit}`)
          .toString()
          .split(",")
          .join(" ");
      }
    );

    return cssObj;
  },
});
