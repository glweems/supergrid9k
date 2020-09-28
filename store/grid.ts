import { CodePenData } from '@/components/CodePenButton';
import { GridTemplateControlProps } from '@/components/GridEditor/GridEditorControls';
import { Area, template } from 'css-grid-template-parser';
import React, { CSSProperties } from 'react';
import { atom, selector, useRecoilState } from 'recoil';
import getAllowedEntry from '../lib/getAllowedEntry';
import { cssTemplateString, htmlTemplateString } from '../lib/templateStrings';
import {
  createCssString,
  GridControlUnit,
  removeItemAtIndex,
  replaceItemAtIndex,
} from '../lib/utils';

export type GridTemplateEntry = {
  // id: string;
  amount: number;
  unit: GridControlUnit;
};
export interface RawGridState {
  name: string;
  gridTemplateRows: string;
  gridTemplateColumns: string;
  gridGap: string;
  gridContainerClassName: string;
  useCssRepeatFn: boolean;
}
export interface GridState {
  _id?: string;
  name: string;
  gridTemplateRows: GridTemplateEntry[];
  gridTemplateColumns: GridTemplateEntry[];
  gridGap: [GridTemplateEntry, GridTemplateEntry];
  gridContainerClassName: string;
  useCssRepeatFn: boolean;
  width: number;
  height: number;
  areas: Record<string, Area>;
  // gridTemplateArea: string;
}

export type GridControlObjKey = keyof Pick<
  GridState,
  'gridTemplateColumns' | 'gridTemplateRows' | 'gridGap'
>;

export interface GridAreaState {
  name: string;
  id: string;
  gridRowStart: number;
  gridRowEnd: number;
  gridColumnStart: number;
  gridColumnEnd: number;
}

export function makeGridAreas(state?: GridState) {
  if (!state) return [];

  // const rows = new Array(s)

  return [{}, {}];
}
export interface GridCssObj
  extends Pick<
    CSSProperties,
    'display' | 'gridGap' | 'gridTemplateRows' | 'gridTemplateColumns'
  > {
  className: string;
}

export function makeGridCss(
  state: GridState,
  _items?: GridAreaState[]
): GridCssObj {
  const gridContainerClassName = state?.gridContainerClassName;
  const gridTemplateRows = state?.gridTemplateRows;
  const gridTemplateColumns = state?.gridTemplateColumns;
  const useCssRepeatFn = state?.useCssRepeatFn;
  const obj = {
    display: 'grid',
    height: 'inherit',
    className: gridContainerClassName,
    gridGap: `${state?.gridGap?.[0]?.amount}${state?.gridGap?.[0]?.unit} ${state?.gridGap?.[1]?.amount}${state?.gridGap?.[1]?.unit}`,
    gridTemplateRows: createCssString(gridTemplateRows, useCssRepeatFn),
    gridTemplateColumns: createCssString(gridTemplateColumns, useCssRepeatFn),
    gridTemplateAreas: template({
      height: gridTemplateColumns?.length,
      width: gridTemplateRows?.length,
      areas: state.areas,
    }),
  };

  return obj;
}
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
  name: GridControlObjKey,
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

export function useControlHandlers(
  gridObjKey: GridControlObjKey,
  index: number
) {
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
      getAllowedEntry(name, value, entry)
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

    return makeGridCss(gridState);
  },
});

export const gridEditorAreas = selector({
  key: 'areas',
  get: ({ get }) => {
    const gridState = get(grid);

    return makeGridAreas(gridState);
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
