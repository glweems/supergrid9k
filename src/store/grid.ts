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
    const rows = state.gridTemplateRows.split(" ");
    const columns = state.gridTemplateColumns.split(" ");
    return {
      rows,
      columns,
      numGridSquares: rows.length * columns.length,
    };
  },
});
