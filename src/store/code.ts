import { atom, selector } from "recoil";
import templateGenerator from "../lib/templateGenerator";
import { CssGridProps } from "./grid";

const example: CssGridProps = {
  display: "grid",
  gridTemplateRows: "1fr 1fr 1fr",
  gridTemplateColumns: "1fr 1fr 1fr",
  gridGap: "1rem",
};

const cssTemplate = templateGenerator<CssGridProps>`
  .grid-container {
    display: ${"display"};
    grid-template-rows: ${"gridTemplateRows"};
    grid-template-columns: ${"gridTemplateColumns"};
    grid-gap: ${"gridGap"};
  }
`;

const johnsTemplate = cssTemplate(example);

console.log(johnsTemplate);
