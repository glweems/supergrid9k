import { template } from 'css-grid-template-parser';
import { CSSProperties } from 'react';
import { GridState } from '../components/GridEditor/GridState';
import { GridControlUnit } from '../lib/utils';

export type GridTemplateEntry = {
  // id: string;
  amount: number;
  unit: GridControlUnit;
};

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
  const obj = {
    display: 'grid',
    height: 'inherit',
    className: gridContainerClassName,
    gridGap: `${state?.gridGap?.[0]?.amount}${state?.gridGap?.[0]?.unit} ${state?.gridGap?.[1]?.amount}${state?.gridGap?.[1]?.unit}`,
    // gridTemplateRows: createCssString(gridTemplateRows, useCssRepeatFn),
    // gridTemplateColumns: createCssString(gridTemplateColumns, useCssRepeatFn),
    gridTemplateAreas: template({
      height: gridTemplateColumns?.length,
      width: gridTemplateRows?.length,
      areas: state.areas,
    }),
  };

  return obj;
}
