import { Language } from "prism-react-renderer";
import { atom, selector } from "recoil";
import { CodeBlockProps } from "../components/CodeBlock";
import {
  cssTemplateString,
  htmlTemplateString,
  styledComponentsTemplateString,
  styleObjHTMLTemplateString,
  styleObjTemplateString,
} from "../lib/templateStrings";
import { toType } from "../lib/toType";
import { gridCss } from "./grid";

interface Snippet {
  language: Language | string;
  templateString: (
    data: Record<
      | "display"
      | "gridTemplateRows"
      | "gridTemplateColumns"
      | "gridGap"
      | "class",
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
    const { snippet, gridContainerClassName } = get(code);

    const codeObj: any =
      toType(snippets[snippet]) === "object"
        ? {
            language: (snippets[snippet] as Snippet).language,
            code: (snippets[snippet] as Snippet).templateString({
              ...cssObj,
              class: gridContainerClassName,
            }),
          }
        : (snippets[snippet] as Snippet[]).map(
            ({ language, templateString }) => ({
              language,
              code: templateString({
                ...cssObj,
                class: gridContainerClassName,
              }),
            })
          );

    return codeObj as CodeBlockProps | CodeBlockProps[];
  },
});
