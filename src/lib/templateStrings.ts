import { CssGridProps } from "../store/grid";
import templateGenerator from "./templateGenerator";

export const cssTemplateString = templateGenerator<
  CssGridProps
>`.grid-container {
    display: ${"display"};
    grid-template-rows: ${"gridTemplateRows"};
    grid-template-columns: ${"gridTemplateColumns"};
    grid-gap: ${"gridGap"};
  }
`;

export const htmlTemplateString = templateGenerator<
  CssGridProps
>`<div class="grid-container"></div>`;

export const styledComponentsTemplateString = templateGenerator<
  CssGridProps
>`const GridContainer = styled.div\`\n  display: ${"display"};
  grid-template-rows: ${"gridTemplateRows"};
  grid-template-columns: ${"gridTemplateColumns"};
  grid-gap: ${"gridGap"};\n\`;
`;

export const styleObjTemplateString = templateGenerator<
  CssGridProps
>`const style = {
  display: "${"display"}",
  gridTemplateRows: "${"gridTemplateRows"}",
  gridTemplateColumns: "${"gridTemplateColumns"}",
  gridGap: "${"gridGap"}"
}
`;

export const styleObjHTMLTemplateString = templateGenerator<
  CssGridProps
>`<div style={styleObj}></div>`;
