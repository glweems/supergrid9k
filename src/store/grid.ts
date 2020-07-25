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
    console.log(values);
    Object.entries(state).forEach(([key, val]) => {
      (values as any)[key] = val
        .split(" ")
        .map((str: string) => [
          str.replace(/[^a-z]/g, ""),
          str.replace(/[^1-9]/g, ""),
        ]);
    });

    return {
      values,
      numGridSquares: values.gridTemplateRows.length * columns.length,
    };
    // const rows = state.gridTemplateRows.split(" ");
    // const columns = state.gridTemplateColumns
    //   .split(" ")
    //   .map((str) => [str.replace(/[^a-z]/g, ""), str.replace(/[^1-9]/g, "")]);
    // return {
    //   rows,
    //   columns,
    // };
  },
});
