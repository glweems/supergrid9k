import React from "react";
import { atom, selector, useRecoilState, useRecoilValue } from "recoil";
import Box from "../ui/Box";

export type GridItem = [number, string];

interface Props {}

const grid = atom<{ rows: GridItem[]; columns: GridItem[] }>({
  key: "grid",
  default: {
    rows: [
      [1, "fr"],
      [1, "fr"],
      [1, "fr"],
    ],
    columns: [
      [1, "fr"],
      [1, "fr"],
      [1, "fr"],
    ],
  },
});

function gridEntriesToCssProperties(entries: GridItem[]): string {
  return entries
    .map(([amt, unit]) => `${amt}${unit}`)
    .toString()
    .split(",")
    .join(" ");
}

export const gridCssProperties = selector({
  key: "cssProperties",
  get: ({ get }) => {
    const { rows, columns } = get(grid);
    return {
      rows: gridEntriesToCssProperties(rows),
      columns: gridEntriesToCssProperties(columns),
    };
  },
});

const GridEditor = (props: Props) => {
  const [{ rows, columns }] = useRecoilState(grid);
  const css = useRecoilValue(gridCssProperties);
  return (
    <div>
      <Box
        display="grid"
        gridTemplateRows={css.rows}
        gridTemplateColumns={css.columns}
      >
        {[...rows, ...columns].map((num) => (
          <Box size={100} bg="orangeWeb" />
        ))}
      </Box>
      <pre>
        <code>{JSON.stringify(css, null, 2)}</code>
      </pre>
    </div>
  );
};

export default GridEditor;
