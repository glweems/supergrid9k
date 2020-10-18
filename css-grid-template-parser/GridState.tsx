import { Entry, RawGridState } from 'css-grid-template-parser';
export type CodeGenFn = (state?: GridState) => string;

export interface GridState {
  areas: RawGridState['areas'];
  rows: Entry[];
  columns: Entry[];
  gap: {
    rowGap: Entry;
    columnGap: Entry;
  };
}

/*
    gridTemplateAreas() {
      const str = template({
        width: this.gridTemplateRows.length,
        height: this.gridTemplateColumns?.length,
        areas: this.areas,
      });

      return str;
    }
     */

/*
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

      return [
        ...items,
        ...Object.entries(this.areas).map(([key, val]) => ({
          ...val,
          name: key,
          gridArea: key,
        })),
      ];
    }
     */
