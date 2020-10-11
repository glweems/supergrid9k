import { GridItemProps } from '@components/GridEditor/GridAreas';
import {
  entriesArrayParser,
  Entry,
  RawGridState,
  template,
  track,
} from 'css-grid-template-parser';
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
  selected: null | GridItemProps;

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

  gridTemplateAreas() {
    const str = template({
      width: this.gridTemplateRows.length,
      height: this.gridTemplateColumns?.length,
      areas: this.areas,
    });
    console.log('str: ', str);
    return str;
  }

  items() {
    const items = this.gridTemplateAreas()
      .replace(/["]+/g, '')
      .split('\n')
      .flatMap((rowStr, rowStart) =>
        rowStr.split(' ').map((name, colStart) => {
          const row = track(rowStart + 1, rowStart + 2);
          const column = track(colStart + 1, colStart + 2);
          const gridArea = [row.start, column.start, row.end, column.end].join(
            ' / '
          );

          return { name, gridArea, row, column };
        })
      );
    // .filter((obj) => obj.name === '.');

    return [
      ...items,
      ...Object.entries(this.areas).map(([key, val]) => ({
        ...val,
        name: key,
        gridArea: key,
      })),
    ];
  }
}

/*
  removeEntry(objKey: TemplateStringObjKey, index: number) {
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

    this[objKey][index][key] = value;
  }

  */
