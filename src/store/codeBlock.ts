import { selector } from "recoil";
import { gridCss } from "./grid";
import { cssTemplateString, htmlTemplateString } from "../lib/templateStrings";

export const snippets = selector({
  key: "snippets",
  get: ({ get }) => {
    const css = get(gridCss);

    const state = {
      css: cssTemplateString(css),
      html: htmlTemplateString(css),
    };
  },
});
