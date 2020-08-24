import { InputProps } from "@rebass/forms/styled-components";
import { ControlPosition } from "react-draggable";
import { atom, selector, useRecoilState } from "recoil";
import { CodePenData } from "./components/CodePenButton";
import { SelectProps } from "./components/Select";
import {
  cssTemplateString,
  htmlTemplateString,
  TemplateStringObject,
} from "./lib/templateStrings";
import {
  createCssString,
  defaultGridState,
  GridUnit,
  replaceItemAtIndex,
  getAllowedEntry,
  removeItemAtIndex,
} from "./lib/utils";

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
  gridGap: GridTemplateEntry[];
  gridContainerClassName: string;
  useCssRepeatFn: boolean;
}

export type GridStateName = Pick<
  GridState,
  "gridTemplateColumns" | "gridTemplateRows" | "gridGap"
>;

export const grid = atom<null | GridState>({
  key: "grid",
  default: null,
});

export const resetGrid = selector({
  key: "resetGrid",
  get: ({ get }) => get(grid),
  set: ({ set }) => set(grid, defaultGridState),
});

export const cssRepeatFn = selector({
  key: "cssRepeatFn",
  get: ({ get }) => get(grid).useCssRepeatFn,
  set: ({ set, get }) => {
    const { useCssRepeatFn, ...prev } = get(grid);
    set(grid, { ...prev, useCssRepeatFn: !useCssRepeatFn });
  },
});

export const gridContainerClassName = selector<string>({
  key: "gridContainerClassName",
  get: ({ get }) => {
    const { gridContainerClassName } = get(grid);
    return gridContainerClassName;
  },
  set: ({ set, get }, value) => {
    set(grid as any, {
      ...get(grid),
      gridContainerClassName: value,
    });
  },
});

export function useGridTemplate(name: keyof GridStateName) {
  const [gridState, setGridState] = useRecoilState(grid);

  const entries = gridState[name];

  const addEntry = () => {
    const lastEntry = {
      ...entries.slice(-1)[0],
      id: `${name}.${entries.length}`,
    };

    const newEntries = [...entries, lastEntry];

    setGridState((prev) => ({ ...prev, [name]: newEntries }));
  };

  return { entries, addEntry, name };
}

export function useControlHandlers(
  gridObjKey: keyof GridStateName,
  id: string
) {
  const [gridState, setGridState] = useRecoilState(grid);
  const entries = gridState[gridObjKey];
  const index = entries.findIndex((e) => e.id === id);

  const entry = gridState[gridObjKey][index];

  const handleChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLSelectElement
  > = ({ target: { name, value } }) => {
    console.log("value : ", value);
    console.log("name: ", name);

    const newEntry = replaceItemAtIndex<GridTemplateEntry>(
      entries,
      index,
      getAllowedEntry(name, value as any, entry)
    );

    setGridState((prev) => ({ ...prev, [gridObjKey]: newEntry }));
  };

  const handleDelete: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    const newEntries = removeItemAtIndex(entries, index);
    setGridState((prev) => ({ ...prev, [gridObjKey]: newEntries }));
  };

  const canDelete = entries.length < 2;

  return { handleChange, handleDelete, canDelete };
}

export const gridCss = selector<TemplateStringObject>({
  key: "gridCss",
  get: ({ get }) => {
    const gridState = get(grid) ?? defaultGridState;
    const {
      gridContainerClassName,
      gridTemplateRows,
      gridTemplateColumns,
      useCssRepeatFn,
      gridGap,
    } = gridState;

    const cssObj: TemplateStringObject = {
      className: gridContainerClassName,
      gridGap: `${gridState?.gridGap?.[0]?.amount}${gridState?.gridGap?.[0]?.unit} ${gridState?.gridGap?.[0]?.amount}${gridState?.gridGap?.[0]?.unit}`,
      gridTemplateRows: createCssString(gridTemplateRows, useCssRepeatFn),
      gridTemplateColumns: createCssString(gridTemplateColumns, useCssRepeatFn),
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
