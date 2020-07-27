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

export type GridTemplateEntry = {
  id: string;
  amount: number;
  unit: string;
};

export interface GridState {
  gridTemplateRows: GridTemplateEntry[];
  gridTemplateColumns: GridTemplateEntry[];
}

export const grid = atom<GridState>({
  key: "grid",
  default: {
    gridTemplateRows: [
      { id: shortid(), amount: 1, unit: "fr" },
      { id: shortid(), amount: 1, unit: "fr" },
      { id: shortid(), amount: 1, unit: "fr" },
    ],
    gridTemplateColumns: [
      { id: shortid(), amount: 1, unit: "fr" },
      { id: shortid(), amount: 1, unit: "fr" },
      { id: shortid(), amount: 1, unit: "fr" },
    ],
  },
});

export const gridCss = selector({
  key: "gridCss",
  get: ({ get }) => {
    const state = get(grid);
    const obj = {
      gridTemplateRows: state.gridTemplateRows
        .map(({ amount, unit }) => `${amount}${unit}`)
        .toString()
        .split(",")
        .join(" "),
      gridTemplateColumns: state.gridTemplateColumns
        .map(({ amount, unit }) => `${amount}${unit}`)
        .toString()
        .split(",")
        .join(" "),
    };
    return obj;
  },
});

export const gridSquares = selector({
  key: "gridSquares",
  get: ({ get }) => {
    const state = get(grid);
    return state.gridTemplateColumns.length * state.gridTemplateRows.length;
  },
});

/* export const gridValues = selector({
  key: "gridValues",
  get: ({ get }) => {
    const state = get(grid);

    let values = {};

    Object.entries(state).forEach(([key, val]) => {
      (values as any)[key] = val
        .split(" ")
        .map((str: string) => [
          str.replace(/[^1-9]/g, ""),
          str.replace(/[^a-z]/g, ""),
        ]);
    });

    return {
      ...values,
      numGridSquares:
        state.gridTemplateRows.split(" ").length *
        state.gridTemplateColumns.split(" ").length,
    };
  },
}); */
