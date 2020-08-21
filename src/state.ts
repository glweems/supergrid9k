import { InputProps } from "@rebass/forms/styled-components";
import { CSSProperties } from "react";
import { ControlPosition } from "react-draggable";
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

export const gridContainerClass = atom({
  key: "gridContainerClass",
  default: "grid-container",
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
    const className = get(gridContainerClass);
    const { amount, unit } = state.gridGap;

    const cssObj: TemplateStringObject = {
      className,
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
  gridRowStart: number;
  gridRowEnd: number;
  gridColumnStart: number;
  gridColumnEnd: number;
  lastRow: boolean;
  lastCol: boolean;
  gridArea: string;
  row: GridTemplateEntry;
  column: GridTemplateEntry;
}

export const gridAreas = selector<GridArea[]>({
  key: "areas",
  get: ({ get }) => {
    const { gridTemplateRows, gridTemplateColumns } = get(grid);

    let temp: Omit<GridArea, "number">[] = [];

    gridTemplateRows.forEach((row, rowIndex) => {
      gridTemplateColumns.forEach((column, columnIndex) => {
        const gridRowStart = rowIndex + 1;
        const gridRowEnd = rowIndex + 2;
        const gridColumnStart = columnIndex + 1;
        const gridColumnEnd = columnIndex + 2;

        return temp.push({
          id: `${row.id}.${column.id}`,
          row,
          column,
          gridTemplateArea: ".",
          gridRowStart,
          gridRowEnd,
          gridColumnStart,
          gridColumnEnd,
          gridArea: [gridRowStart, gridColumnStart, gridRowEnd, gridColumnEnd]
            .toString()
            .split(",")
            .join(" / "),
          lastRow:
            columnIndex === 0 && rowIndex + 1 === gridTemplateRows.length,
          lastCol:
            rowIndex === 0 && columnIndex + 1 === gridTemplateColumns.length,
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

export const drag = atom<ControlPosition>({
  key: "drag",
  default: { x: 0, y: 0 },
});
