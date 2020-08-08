import { atom, selector } from "recoil";
import shortid from "shortid";
import { SelectProps } from "../components/Select";
import { TemplateStringObject } from "../lib/templateStrings";

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

export const availableGridGapUnits = ["px", "rem", "em", "vh", "vw"];

export const defaultInputProps = {
  name: "amount",
  min: 0,
  max: 100,
  step: 1,
  disabled: false,
  type: "number",
};

export const defaultSelectProps: SelectProps = {
  name: "unit",
  disabled: false,
  options: availableUnits,
};
export type GridInputElement = "input" | "select" | "button";

export type GridTemplateEntry = {
  id: string;
  amount: number | "";
  unit: string;
  inputProps: React.InputHTMLAttributes<HTMLInputElement>;
  selectProps: SelectProps;
};

export interface GridState {
  gridTemplateRows: GridTemplateEntry[];
  gridTemplateColumns: GridTemplateEntry[];
  gridGap: GridTemplateEntry;
}

const grid = atom<GridState>({
  key: "grid",
  default: {
    gridTemplateRows: new Array(2).fill(null).map((_, index) => ({
      id: `row-${index}`,
      amount: 1,
      unit: "fr",
      inputProps: defaultInputProps,
      selectProps: defaultSelectProps,
    })),
    gridTemplateColumns: new Array(2).fill(null).map((_, index) => ({
      id: `column-${index}`,
      amount: 1,
      unit: "fr",
      inputProps: defaultInputProps,
      selectProps: defaultSelectProps,
    })),

    gridGap: {
      id: shortid(),
      amount: 1,
      unit: "rem",
      inputProps: defaultInputProps,
      selectProps: { ...defaultSelectProps, options: availableGridGapUnits },
    },
  },
});

export default grid;

export function dataToCss(entries: GridTemplateEntry[]) {
  return entries
    .map(({ amount, unit }) => `${amount}${unit}`)
    .toString()
    .split(",")
    .join(" ");
}

export const gridCss = selector<TemplateStringObject>({
  key: "gridCss",
  get: ({ get }) => {
    const state = get(grid);
    const { amount, unit } = state.gridGap;

    const cssObj: TemplateStringObject = {
      className: "grid-container",
      gridGap: `${amount}${unit}`,
      gridTemplateRows: dataToCss(state.gridTemplateRows),
      gridTemplateColumns: dataToCss(state.gridTemplateColumns),
    };

    return cssObj;
  },
});

export interface GridArea {
  gridTemplateArea: string;
  name?: string;
  number: number;
  id: string;
}

export const gridAreas = selector<GridArea[]>({
  key: "areas",
  get: ({ get }) => {
    const { gridTemplateRows, gridTemplateColumns } = get(grid);
    let temp: Omit<GridArea, "number">[] = [];

    gridTemplateRows.forEach((row, rowIndex) => {
      gridTemplateColumns.forEach((col, colIndex) => {
        temp.push({
          id: `${row.id}.${col.id}`,
          gridTemplateArea: ".",
        });
      });
    });

    const areas: GridArea[] = temp.map((item, index) => ({
      ...item,
      number: index + 1,
    }));

    return areas;
  },
});
