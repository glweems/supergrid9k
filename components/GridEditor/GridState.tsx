import {
  entriesArrayParser,
  Entry,
  RawGridState,
} from 'css-grid-template-parser';
import createGridAreasArray from '@components/GridEditor/createGridItems';
import { GridItemProps } from '@components/GridEditor/GridAreas';
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
  selected: null | GridItemProps['id'];

  constructor(args: RawGridState) {
    this.name = args.name;
    this.gridContainerClassName = args.gridContainerClassName;
    this.useCssRepeatFn = args.useCssRepeatFn;
    this.areas = args.areas;
    this.gridTemplateRows = entriesArrayParser(args.gridTemplateRows);
    this.gridTemplateColumns = entriesArrayParser(args.gridTemplateColumns);
    this.gridGap = entriesArrayParser(args.gridGap);
    this.code = { html: () => '' };
    this.selected = null;
  }

  items(state = this) {
    const { gridTemplateRows, gridTemplateColumns } = state;
    return createGridAreasArray(gridTemplateRows, gridTemplateColumns);
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

  */
