import { templateGenerator } from "./utils";
import { GridProps } from "styled-system";

export interface TemplateStringObject extends GridProps {
  className?: string;
}

export const cssTemplateString = templateGenerator<
  TemplateStringObject
>`.${"className"} {
    display: grid;
    grid-template-rows: ${"gridTemplateRows"};
    grid-template-columns: ${"gridTemplateColumns"};
    grid-gap: ${"gridGap"};
  }`;

export const htmlTemplateString = templateGenerator<
  TemplateStringObject
>`<div className="${"className"}"></div>`;

export const styledComponentsTemplateString = templateGenerator<
  TemplateStringObject
>`const ${"className"} = styled.div\`\n   display: grid;
    grid-template-rows: ${"gridTemplateRows"};
    grid-template-columns: ${"gridTemplateColumns"};
    grid-gap: ${"gridGap"};\n\`;`;

export const styleObjTemplateString = templateGenerator<
  TemplateStringObject
>`const ${"className"} = {
  display: grid;
  gridTemplateRows: "${"gridTemplateRows"}",
  gridTemplateColumns: "${"gridTemplateColumns"}",
  gridGap: "${"gridGap"}"
}
`;

export const styleObjHTMLTemplateString = templateGenerator<
  TemplateStringObject
>`<div style={${"className"}}></div>`;
