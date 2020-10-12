import { Properties } from 'csstype';

export interface Track {
  start: number;
  end: number;
  span: number;
}

export interface Area {
  row: Track;
  column: Track;
}

export interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface Grid {
  width: number;
  height: number;
  areas: Record<string, Area>;
}

export type Unit = 'fr' | '%' | 'px' | 'vw' | 'vh' | 'em' | 'rem' | 'auto';
export interface Entry {
  amount: number | '';
  unit: Unit;
}

export type TemplateStringObjKey = keyof Pick<
  RawGridState,
  'gridTemplateRows' | 'gridTemplateColumns' | 'gridGap'
>;

export type GridStateJson = GridState &
  {
    [K in TemplateStringObjKey]: Entry[];
  };
export interface RawGridState
  extends Omit<
    GridState,
    'gridTemplateRows' | 'gridTemplateColumns' | 'gridGap'
  > {
  gridTemplateRows: Properties[TemplateStringObjKey];
  gridTemplateColumns: Properties['gridTemplateColumns'];
  gridGap: Properties['gap'];
}
export interface GridState {
  name: string;
  gridTemplateRows: Entry[];
  gridTemplateColumns: Entry[];
  gridGap: Entry[];
  gridContainerClassName: string;
  useCssRepeatFn: boolean;
  areas: Record<string, Area>;
}
