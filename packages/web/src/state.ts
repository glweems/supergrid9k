import { InputProps } from "@rebass/forms/styled-components";
import { ControlPosition } from "react-draggable";
import { atom, selector, useRecoilState } from "recoil";
import { CodePenData } from "./components/CodePenButton";
import { GridTemplateControlProps } from "./components/GridEditor/GridEditorControls";
import { SelectProps } from "./components/Select";
import {
  cssTemplateString,
  htmlTemplateString,
  TemplateStringObject,
} from "./lib/templateStrings";
import {
  createCssString,
  defaultGridState,
  getAllowedEntry,
  GridUnit,
  removeItemAtIndex,
  replaceItemAtIndex,
} from "./lib/utils";

export type GridTemplateEntry = {
  id: string;
  amount: number;
  unit: GridUnit;
  inputProps: InputProps;
  selectProps: SelectProps;
};

export interface GridState {
  gridTemplateRows: GridTemplateEntry[];
  gridTemplateColumns: GridTemplateEntry[];
  gridGap: GridTemplateEntry[];
  initialState?: GridState;
  gridContainerClassName: string;
  useCssRepeatFn: boolean;
  saved?: boolean;
}

export type GridStateName = keyof Pick<
  GridState,
  "gridTemplateColumns" | "gridTemplateRows" | "gridGap"
>;

export const grid = atom<null | GridState>({
  key: "grid",
  default: null,
});

export function useResetGrid(newState?: GridState) {
  const [gridState, setGridState] = useRecoilState(grid);

  let resetValue = defaultGridState;
  if (gridState?.initialState) resetValue = gridState;
  if (newState) resetValue = newState;
  function resetGrid() {
    return setGridState(resetValue);
  }

  return resetGrid;
}
export const cssRepeatFn = selector({
  key: "cssRepeatFn",
  get: ({ get }) => {
    const gridState = get(grid);
    if (gridState) return gridState.useCssRepeatFn;
  },

  set: ({ set, get }) => {
    const gridState = get(grid);
    if (gridState) {
      set(grid, { ...gridState, useCssRepeatFn: !gridState.useCssRepeatFn });
    }
  },
});

export const gridContainerClassName = selector<string>({
  key: "gridContainerClassName",
  get: ({ get }) => {
    const gridState = get(grid);
    if (gridState) return gridState.gridContainerClassName;
    return "";
  },
  set: ({ set, get }, value) => {
    const gridState = get(grid);

    if (gridState) {
      set(grid, {
        ...gridState,
        gridContainerClassName: value,
      });
    }
  },
});

export function useGridTemplate(
  name: GridStateName,
  legend: string
): GridTemplateControlProps {
  const [gridState, setGridState] = useRecoilState(grid);

  const addEntry = () => {
    if (gridState) {
      const entries = gridState[name];
      const lastEntry = {
        ...entries.slice(-1)[0],
        id: `${name}.${entries.length}`,
      };

      const newEntries = [...entries, lastEntry];

      setGridState({ ...gridState, [name]: newEntries });
    }
  };

  return { entries: gridState ? gridState[name] : [], addEntry, name, legend };
}

export function useControlHandlers(gridObjKey: GridStateName, id: string) {
  const [gridState, setGridState] = useRecoilState(grid);

  const handleChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLSelectElement
  > = ({ target: { name, value } }) => {
    if (gridState) {
      const entries = gridState[gridObjKey];
      const index = entries.findIndex((e) => e.id === id);
      const entry = gridState[gridObjKey][index];
      const newEntry = replaceItemAtIndex<GridTemplateEntry>(
        entries,
        index,
        getAllowedEntry(name, value as any, entry)
      );
      setGridState({ ...gridState, [gridObjKey]: newEntry });
    }
  };

  const handleDelete: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    if (gridState) {
      const entries = gridState[gridObjKey];
      const index = entries.findIndex((e) => e.id === id);
      const newEntries = removeItemAtIndex(entries, index);
      setGridState({
        ...gridState,
        [gridObjKey]: newEntries,
      });
    }
  };

  const canDelete = gridState !== null && gridState[gridObjKey].length < 2;

  return { handleChange, handleDelete, canDelete };
}

export const gridCss = selector({
  key: "gridCss",
  get: ({ get }) => {
    const gridState = get(grid);

    if (gridState) {
      const {
        gridContainerClassName,
        gridTemplateRows,
        gridTemplateColumns,
        useCssRepeatFn,
      } = gridState;

      const cssObj: TemplateStringObject = {
        className: gridContainerClassName,
        gridGap: `${gridState?.gridGap?.[0]?.amount}${gridState?.gridGap?.[0]?.unit} ${gridState?.gridGap?.[1]?.amount}${gridState?.gridGap?.[1]?.unit}`,
        gridTemplateRows: createCssString(gridTemplateRows, useCssRepeatFn),
        gridTemplateColumns: createCssString(
          gridTemplateColumns,
          useCssRepeatFn
        ),
      };

      return cssObj;
    }
    return null;
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

export const gridAreas = selector({
  key: "areas",
  get: ({ get }) => {
    const gridState = get(grid);
    if (gridState) {
      const { gridTemplateRows, gridTemplateColumns } = gridState;
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
    }
  },
});

export type CodeSnippetLanguage = "html" | "css";

export type CodeSnippetState = Record<CodeSnippetLanguage, string>;

export const snippets = selector({
  key: "snippets",
  get: ({ get }) => {
    const areasState = get(gridAreas);
    const cssState = get(gridCss);

    let num = 1;
    let gridItems = ``;

    areasState?.forEach((item, index) => {
      gridItems += `  <div class="grid-item">${num}</div>${
        index === areasState?.length ? "" : "\n"
      }`;
      num += 1;
    });

    const state = {
      css: cssTemplateString(cssState ?? {}),
      html: htmlTemplateString({ ...cssState, gridItems }),
    };
    return state;
  },
});

export const codePenOptions = selector<CodePenData>({
  key: "codePenConfig",
  get: ({ get }) => {
    const codes = get(snippets);
    const config: CodePenData = {
      html: codes?.html,
      css: codes?.css,
    };
    return config;
  },
});

export const drag = atom<ControlPosition>({
  key: "drag",
  default: { x: 0, y: 0 },
});
