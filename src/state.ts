import { InputProps } from "@rebass/forms/styled-components";
import { atom, selector } from "recoil";
import { CodePenData } from "./components/CodePenButton";
import { SelectProps } from "./components/Select";
import {
  cssTemplateString,
  htmlTemplateString,
  TemplateStringObject,
} from "./lib/templateStrings";
import { createCssString, defaultGridState, GridUnit } from "./lib/utils";

export type GridTemplateEntry = {
  id: string;
  amount: number | "";
  unit: GridUnit;
  inputProps: InputProps;
  selectProps: SelectProps;
};

export interface GridState {
  gridTemplateRows: GridTemplateEntry[];
  gridTemplateColumns: GridTemplateEntry[];
  gridGap: GridTemplateEntry;
}

export const grid = atom<GridState>({
  key: "grid",
  default: defaultGridState,
});

export const resetGrid = selector({
  key: "ResetGrid",
  get: ({ get }) => get(grid),
  set: ({ set }) => set(grid, defaultGridState),
});

export const cssRepeat = atom({
  key: "useCssGridRepeat",
  default: true,
});

export const gridCss = selector<TemplateStringObject>({
  key: "gridCss",
  get: ({ get }) => {
    const state = get(grid);
    const repeat = get(cssRepeat);
    const { amount, unit } = state.gridGap;

    const cssObj: TemplateStringObject = {
      className: "grid-container",
      gridGap: `${amount}${unit}`,
      gridTemplateRows: createCssString(state.gridTemplateRows, repeat),
      gridTemplateColumns: createCssString(state.gridTemplateColumns, repeat),
    };

    return cssObj;
  },
});

export interface GridArea {
  gridTemplateArea: string;
  name?: string;
  number: number;
  id: string;
}

export const gridAreas = selector<GridArea[]>({
  key: "areas",
  get: ({ get }) => {
    const { gridTemplateRows, gridTemplateColumns } = get(grid);
    let temp: Omit<GridArea, "number">[] = [];

    gridTemplateRows.forEach((row, rowIndex) => {
      gridTemplateColumns.forEach((col, colIndex) => {
        temp.push({
          id: `${row.id}.${col.id}`,
          gridTemplateArea: ".",
        });
      });
    });

    const areas: GridArea[] = temp.map((item, index) => ({
      ...item,
      number: index + 1,
    }));

    return areas;
  },
});

export type CodeSnippetLanguage = "html" | "css";

export type CodeSnippetState = Record<CodeSnippetLanguage, string>;

export const snippets = selector<CodeSnippetState>({
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

export const codePenOptions = selector<CodePenData>({
  key: "codePenConfig",
  get: ({ get }) => {
    const { html, css } = get(snippets);
    const config: CodePenData = {
      html,
      css,
    };
    return config;
  },
});
