import { selector } from "recoil";
import templateGenerator from "../lib/templateGenerator";
import { CssGridProps, dataToCss, grid } from "./grid";

const cssTemplate = templateGenerator<CssGridProps>`
  .grid-container {
    display: ${"display"};
    grid-template-rows: ${"gridTemplateRows"};
    grid-template-columns: ${"gridTemplateColumns"};
    grid-gap: ${"gridGap"};
  }
`;

export const codeBlocks = selector({
  key: "codeBlocks",
  get: ({ get }) => {
    const state = get(grid);
    const { amount, unit } = state.gridGap;

    const cssObj: CssGridProps = {
      display: "grid",
      gridGap: `${amount}${unit}`,
      gridTemplateRows: dataToCss(state.gridTemplateRows),
      gridTemplateColumns: dataToCss(state.gridTemplateColumns),
    };

    const blocks = { vanilla: cssTemplate(cssObj) };

    return blocks;
  },
});
