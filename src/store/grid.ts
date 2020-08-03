import { atom, selector } from "recoil";
import shortid from "shortid";

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

export const defaultInputProps = {
  min: 0,
  max: 100,
  step: 1,
  disabled: false,
  type: "number",
};
export type GridInputElement = "input" | "select" | "button";

export type GridTemplateEntry = {
  id: string;
  amount: number;
  unit: string;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
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
      { id: shortid(), amount: 1, unit: "fr", inputProps: defaultInputProps },
      { id: shortid(), amount: 1, unit: "fr", inputProps: defaultInputProps },
      { id: shortid(), amount: 1, unit: "fr", inputProps: defaultInputProps },
    ],
    gridTemplateColumns: [
      { id: shortid(), amount: 1, unit: "fr", inputProps: defaultInputProps },
      { id: shortid(), amount: 1, unit: "fr", inputProps: defaultInputProps },
      { id: shortid(), amount: 1, unit: "fr", inputProps: defaultInputProps },
    ],
    gridGap: { id: shortid(), amount: 1, unit: "rem" },
  },
});

export type CssGridProps = Record<
  "display" | "gridTemplateRows" | "gridTemplateColumns" | "gridGap",
  string
>;

export function dataToCss(entries: GridTemplateEntry[]) {
  return entries
    .map(({ amount, unit }) => `${amount}${unit}`)
    .toString()
    .split(",")
    .join(" ");
}

export const gridCss = selector({
  key: "gridCss",
  get: ({ get }) => {
    const state = get(grid);
    const { amount, unit } = state.gridGap;

    const cssObj: CssGridProps = {
      display: "grid",
      gridGap: `${amount}${unit}`,
      gridTemplateRows: dataToCss(state.gridTemplateRows),
      gridTemplateColumns: dataToCss(state.gridTemplateColumns),
    };

    return cssObj;
  },
});
