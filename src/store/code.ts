import { atom, selector } from "recoil";
import { CodeProps } from "../components/Code";
import templateGenerator from "../lib/templateGenerator";
import { toType } from "../lib/toType";
import { CssGridProps, gridCss } from "./grid";

type TemplateStringFn = (data: CssGridProps) => string;

const cssTemplateString: TemplateStringFn = templateGenerator`
  .grid-container {
    display: ${"display"};
    grid-template-rows: ${"gridTemplateRows"};
    grid-template-columns: ${"gridTemplateColumns"};
    grid-gap: ${"gridGap"};
  }
`;

const htmlTemplateString: TemplateStringFn = templateGenerator`<div class="grid-container">
// ...
</div>
`;

const styledComponentsTemplateString = templateGenerator`
const GridContainer = styled.div
`;

interface Snippet extends CodeProps {
  templateString: TemplateStringFn;
}
type Snippets = Record<"css" | "styled-components", Snippet | Snippet[]>;

const snippets: Snippets = {
  css: [
    {
      lang: "css",
      templateString: cssTemplateString,
    },
    { lang: "html", templateString: htmlTemplateString },
  ],
  "styled-components": {
    lang: "javascript",
    templateString: styledComponentsTemplateString,
  },
};

export interface CodeState {
  applyCssRepeat: boolean;
  gridContainerClassName: string;
  snippet: keyof Snippets;
}

const codeState = atom<CodeState>({
  key: "codeState",
  default: {
    gridContainerClassName: "grid-container",
    applyCssRepeat: true,
    snippet: "styled-components",
  },
});

export interface CodeBlock extends CodeProps {
  code: string;
}

export const codeBlock = selector({
  key: "codeBlocks",
  get: ({ get }) => {
    const cssObj = get(gridCss);
    const { snippet } = get(codeState);

    const codeObj: CodeBlock | CodeBlock[] =
      toType(snippets[snippet]) === "object"
        ? {
            lang: (snippets[snippet] as Snippet).lang,
            code: (snippets[snippet] as Snippet).templateString(cssObj),
          }
        : (snippets[snippet] as Snippet[]).map(({ lang, templateString }) => ({
            lang,
            code: templateString(cssObj),
          }));

    return codeObj;
  },
});
