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
  editor: Record<string, unknown>;

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
            '/'
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
