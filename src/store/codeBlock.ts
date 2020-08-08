import { selector } from "recoil";
import { cssTemplateString, htmlTemplateString } from "../lib/templateStrings";
import { gridAreas, gridCss } from "./grid";

export const snippets = selector({
  key: "snippets",
  get: ({ get }) => {
    const areas = get(gridAreas);
    const css = get(gridCss);
    let num = 1;
    let gridItems = ``;

    areas.forEach((item, index) => {
      gridItems += `  <div class="grid-item">${num}</div>${
        index === areas.length ? "" : "\n"
      }`;
      num += 1;
    });

    const state = {
      css: cssTemplateString(css),
      html: htmlTemplateString({ ...css, gridItems }),
    };
    return state;
  },
});
