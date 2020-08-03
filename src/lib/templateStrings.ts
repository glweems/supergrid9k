import { CssGridProps } from "../store/grid";
import templateGenerator from "./templateGenerator";

export interface TemplateStringObject extends CssGridProps {
  class: string;
}

export const cssTemplateString = templateGenerator<
  TemplateStringObject
>`.${"class"} {
    display: ${"display"};
    grid-template-rows: ${"gridTemplateRows"};
    grid-template-columns: ${"gridTemplateColumns"};
    grid-gap: ${"gridGap"};
  }`;

export const htmlTemplateString = templateGenerator<
  TemplateStringObject
>`<div class="${"class"}"></div>`;

export const styledComponentsTemplateString = templateGenerator<
  TemplateStringObject
>`const ${"class"} = styled.div\`\n   display: ${"display"};
    grid-template-rows: ${"gridTemplateRows"};
    grid-template-columns: ${"gridTemplateColumns"};
    grid-gap: ${"gridGap"};\n\`;`;

export const styleObjTemplateString = templateGenerator<
  TemplateStringObject
>`const ${"class"} = {
  display: "${"display"}",
  gridTemplateRows: "${"gridTemplateRows"}",
  gridTemplateColumns: "${"gridTemplateColumns"}",
  gridGap: "${"gridGap"}"
}
`;

export const styleObjHTMLTemplateString = templateGenerator<
  TemplateStringObject
>`<div style={${"class"}}></div>`;
