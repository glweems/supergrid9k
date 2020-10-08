import {
  entriesArrayParser,
  Entry,
  RawGridState,
} from 'css-grid-template-parser';
import { TemplateStringObjKey } from 'css-grid-template-parser/dist/types/types';
import { EditorControlStackProps } from './EditorControlStack';
import { removeItemAtIndex } from '../../lib/utils';

export type CodeGenFn = (state?: GridState) => string;

export class GridState {
  name: RawGridState['name'];
  gridContainerClassName: RawGridState['gridContainerClassName'];
  useCssRepeatFn: RawGridState['useCssRepeatFn'];
  areas: RawGridState['areas'];
  gridTemplateRows: Entry[];
  gridTemplateColumns: Entry[];
  gridGap: Entry[];
  code: Record<string, CodeGenFn>;

  constructor(args: RawGridState) {
    this.name = args.name;
    this.gridContainerClassName = args.gridContainerClassName;
    this.useCssRepeatFn = args.useCssRepeatFn;
    this.areas = args.areas;
    this.gridTemplateRows = entriesArrayParser(args.gridTemplateRows);
    this.gridTemplateColumns = entriesArrayParser(args.gridTemplateColumns);
    this.gridGap = entriesArrayParser(args.gridGap);
    this.code = { html: () => '' };
  }
}
/*  removeEntry(objKey: TemplateStringObjKey, index: number) {
    removeItemAtIndex(this[objKey], index);
  }

  setUseCssRepeatFn(newVal?: boolean) {
    if (newVal) {
      this.useCssRepeatFn = newVal;
      return this;
    } else {
      this.useCssRepeatFn = !this.useCssRepeatFn;
    }
    return this;
  }

  controlStackProps(
    objKey: keyof Pick<GridState, TemplateStringObjKey>,
    state = this
  ): Omit<EditorControlStackProps, 'handleChange'> {
    return {
      objKey,
      controls: state[objKey],
      canDelete: objKey !== 'gridGap' && state[objKey].length < 2,
      isGap: objKey === 'gridGap',
    };
  }

  editEntryValue(name: string, value) {
    const [objKey, index, key] = name.split('.');
    console.log('objKey, index, key: ', objKey, index, key);
    this[objKey][index][key] = value;
  }

  items(state = this) {
    const { gridTemplateRows, gridTemplateColumns } = state;
    return Object.entries({
      gridTemplateRows,
      gridTemplateColumns,
    }).flatMap(([key, items], index) => {
      const objKey: keyof Pick<
        GridState,
        'gridTemplateRows' | 'gridTemplateColumns'
      > = key as any;

      return items.map((item, rowIndex) => ({
        objKey,
        index,
        rowIndex,
        ...item,
      }));
    });
  } */
