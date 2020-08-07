import { selector } from "recoil";
import grid, { gridCss } from "./grid";
import { cssTemplateString, htmlTemplateString } from "../lib/templateStrings";

export const snippets = selector({
  key: "snippets",
  get: ({ get }) => {
    const { gridTemplateRows, gridTemplateColumns } = get(grid);
    const css = get(gridCss);
    let gridItems = ``;
    gridTemplateRows.forEach((row, rowIndex) => {
      gridTemplateColumns.forEach((col, colIndex) => {
        gridItems += `  <div class="grid-item">${colIndex + rowIndex}</div>${
          colIndex === gridTemplateColumns.length ? "" : "\n"
        }`;
      });
    });

    const state = {
      css: cssTemplateString(css),
      html: htmlTemplateString({ ...css, gridItems }),
    };
    return state;
  },
});
