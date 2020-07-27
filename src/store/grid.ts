import { atom, selector } from "recoil";

export type GridItem = [number, string];

export interface GridState {
  gridTemplateRows: string;
  gridTemplateColumns: string;
}

export const grid = atom<GridState>({
  key: "grid",
  default: {
    gridTemplateRows: "1fr 1fr 1fr",
    gridTemplateColumns: "1fr 1fr 1fr",
  },
});

export const gridValues = selector({
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
});
