import { atom, selector } from "recoil";
import { PrismCodeProps } from "../components/PrismCode";
import {
  cssTemplateString,
  htmlTemplateString,
  styledComponentsTemplateString,
  styleObjHTMLTemplateString,
  styleObjTemplateString,
} from "../lib/templateStrings";
import { toType } from "../lib/toType";
import { gridCss } from "./grid";

interface Snippet extends Omit<PrismCodeProps, "code"> {
  templateString: (
    data: Record<
      "display" | "gridTemplateRows" | "gridTemplateColumns" | "gridGap",
      string
    >
  ) => string;
}
type Snippets = Record<
  "css" | "styled-components" | "json",
  Snippet | Snippet[]
>;

const snippets: Snippets = {
  css: [
    {
      language: "css",
      templateString: cssTemplateString,
    },
    { language: "html", templateString: htmlTemplateString },
  ],
  "styled-components": {
    language: "javascript",
    templateString: styledComponentsTemplateString,
  },
  json: [
    {
      language: "javascript",
      templateString: styleObjTemplateString,
    },
    {
      language: "html",
      templateString: styleObjHTMLTemplateString,
    },
  ],
};

export interface CodeState {
  applyCssRepeat: boolean;
  gridContainerClassName: string;
  snippet: keyof Snippets;
}

const code = atom<CodeState>({
  key: "codeState",
  default: {
    gridContainerClassName: "grid-container",
    applyCssRepeat: true,
    snippet: "css",
  },
});

export default code;

export const codeBlock = selector({
  key: "codeBlocks",
  get: ({ get }) => {
    const cssObj = get(gridCss);
    const { snippet } = get(code);

    const codeObj: PrismCodeProps | PrismCodeProps[] =
      toType(snippets[snippet]) === "object"
        ? {
            language: (snippets[snippet] as Snippet).language,
            code: (snippets[snippet] as Snippet).templateString(cssObj),
          }
        : (snippets[snippet] as Snippet[]).map(
            ({ language, templateString }) => ({
              language,
              code: templateString(cssObj),
            })
          );

    return codeObj;
  },
});
