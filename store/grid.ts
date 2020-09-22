import { CodePenData } from '@/components/CodePenButton';
import { GridTemplateControlProps } from '@/components/GridEditor/GridEditorControls';
import { SelectProps } from '@/components/Select';
import { InputProps } from '@rebass/forms/styled-components';
import React from 'react';
import { atom, selector, useRecoilState } from 'recoil';
import getAllowedEntry from '../lib/getAllowedEntry';
import {
  cssTemplateString,
  htmlTemplateString,
  TemplateStringObject,
} from '../lib/templateStrings';
import {
  createCssString,
  removeItemAtIndex,
  replaceItemAtIndex,
} from '../lib/utils';

export type GridTemplateEntry = {
  // id: string;
  amount: number;
  unit: string;
  inputProps: InputProps;
  selectProps: SelectProps;
};

export interface GridState {
  _id?: string;
  name: string;
  gridTemplateRows: GridTemplateEntry[];
  gridTemplateColumns: GridTemplateEntry[];
  gridGap: GridTemplateEntry[];
  initialState?: GridState;
  gridContainerClassName: string;
  useCssRepeatFn: boolean;
}

export type GridStateName = keyof Pick<
  GridState,
  'gridTemplateColumns' | 'gridTemplateRows' | 'gridGap'
>;
export const grid = atom<null | GridState>({
  key: 'grid',
  default: null,
});

export function useSetGridState(gridConfigObject: GridState) {
  const [, setGridState] = useRecoilState(grid);

  React.useEffect(() => {
    const newState = { ...gridConfigObject, initialState: gridConfigObject };
    setGridState(newState);
  }, [gridConfigObject, setGridState]);
}

export const dirtyGrid = atom({ key: 'dirtyGrid', default: false });

export function useResetGrid(): React.ButtonHTMLAttributes<HTMLButtonElement> {
  const [gridState, setGridState] = useRecoilState(grid);
  const [isDirty, setIsDirty] = useRecoilState(dirtyGrid);

  const handleClick: React.MouseEventHandler = () => {
    if (gridState?.initialState)
      setGridState({
        ...gridState.initialState,
        initialState: gridState.initialState,
      });
    setIsDirty(false);
  };

  return { onClick: handleClick, disabled: !isDirty };
}

export const cssRepeatFn = selector({
  key: 'cssRepeatFn',
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
  key: 'gridContainerClassName',
  get: ({ get }) => {
    const gridState = get(grid);

    if (gridState) return gridState.gridContainerClassName;
    return '';
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
  const [isDirty, setIsDirty] = useRecoilState(dirtyGrid);

  const addEntry = () => {
    if (gridState) {
      const entries = gridState?.[name];
      const lastEntry = {
        ...entries?.slice(-1)[0],
      };

      const newEntries = [...entries, lastEntry];

      setGridState({ ...gridState, [name]: newEntries });

      if (!isDirty) setIsDirty(true);
    }
  };

  return {
    entries: gridState?.[name],
    addEntry,
    name,
    legend,
  };
}

export function useControlHandlers(gridObjKey: GridStateName, index: number) {
  const [gridState, setGridState] = useRecoilState(grid);
  const [isDirty, setIsDirty] = useRecoilState(dirtyGrid);
  const entries = gridState?.[gridObjKey];
  const entry = gridState?.[gridObjKey][index];

  const changeValue: React.ChangeEventHandler<
    HTMLInputElement | HTMLSelectElement
  > = ({ target: { name, value } }) => {
    const newEntry = replaceItemAtIndex(
      entries,
      index,
      getAllowedEntry({ name, value: value as any, entry })
    );
    setGridState({ ...gridState, [gridObjKey]: newEntry });
    if (!isDirty) setIsDirty(true);
  };

  const handleDelete: React.MouseEventHandler<HTMLButtonElement> = () => {
    const newEntries = removeItemAtIndex(entries, index);
    if (!isDirty) setIsDirty(true);

    setGridState({
      ...gridState,
      [gridObjKey]: newEntries,
    });
  };

  const canDelete = gridState?.[gridObjKey].length < 2;

  return { handleChange: changeValue, handleDelete, canDelete };
}

export const gridCss = selector({
  key: 'gridCss',
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

export const gridEditorAreas = selector({
  key: 'areas',
  get: ({ get }) => {
    const gridState = get(grid);

    const temp: Omit<GridArea, 'number'>[] = [];

    gridState?.gridTemplateRows?.forEach((row, rowIndex) => {
      gridState?.gridTemplateColumns?.forEach((column, columnIndex) => {
        const gridRowStart = rowIndex + 1;
        const gridRowEnd = rowIndex + 2;
        const gridColumnStart = columnIndex + 1;
        const gridColumnEnd = columnIndex + 2;
        const area = {
          id: `${columnIndex}.${rowIndex}`,
          row,
          column,
          gridTemplateArea: '.',
          gridRowStart,
          gridRowEnd,
          gridColumnStart,
          gridColumnEnd,
          gridArea: [gridRowStart, gridColumnStart, gridRowEnd, gridColumnEnd]
            .toString()
            .split(',')
            .join(' / '),
          lastRow:
            columnIndex === 0 &&
            rowIndex + 1 === gridState?.gridTemplateRows.length,
          lastCol:
            rowIndex === 0 &&
            columnIndex + 1 === gridState?.gridTemplateColumns.length,
        };
        temp.push(area);
      });
    });

    return temp;
  },
});

export type CodeSnippetLanguage = 'html' | 'css';

export type CodeSnippetState = Record<CodeSnippetLanguage, string>;

export const snippets = selector({
  key: 'snippets',
  get: ({ get }) => {
    const areasState = get(gridEditorAreas);

    const cssState = get(gridCss);

    let num = 1;
    let gridItems = ``;

    areasState?.forEach((_item, index) => {
      gridItems += `  <div class="grid-item">${num}</div>${
        index === areasState?.length ? '' : '\n'
      }`;
      num += 1;
    });

    const state = {
      css: cssTemplateString(cssState ?? {}),
      html: htmlTemplateString({ ...cssState, gridItems }),
    };
    console.log('state: ', state);
    return state;
  },
});

export const codePenOptions = selector<CodePenData>({
  key: 'codePenOptions',
  get: ({ get }) => {
    const codes = get(snippets);
    const config: CodePenData = {
      html: codes?.html,
      css: codes?.css,
    };
    return config;
  },
});

export function makeDefaultGrid({
  initialState,
  ...state
}: GridState): GridState {
  return { ...state, initialState: { ...initialState, ...state } };
}
