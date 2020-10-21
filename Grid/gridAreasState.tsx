import { track } from 'css-grid-template-parser';
import { selector } from 'recoil';
import { gridState } from './gridState';
import { gridCssState } from './gridCssState';
import { GridAreaObject } from './GridAreas';

export const gridAreasState = selector<GridAreaObject[]>({
  key: 'gridAreas',
  get: ({ get }) => {
    const grid = get(gridState);
    if (!grid) return;
    const css = get(gridCssState);

    const items = css?.gridTemplateAreas
      .replace(/["]+/g, '')
      .split('\n')
      .flatMap((rowStr, rowStart) => {
        return rowStr
          .split(' ')
          .map((name, colStart) => ({
            gridArea: name,
            row: track(rowStart + 1, rowStart + 2),
            column: track(colStart + 1, colStart + 2),
          }))
          .filter((item) => {
            for (const key in grid.areas) {
              if (
                (grid.areas[key].row.start === item.row.start &&
                  grid.areas[key].column.start === item.column.start) ||
                (grid.areas[key].row.end === item.row.end &&
                  grid.areas[key].column.end === item.column.end)
              )
                return false;
            }

            return true;
          });
      });

    const arrs = Object.entries(grid.areas)?.map(([key, val]) => ({
      ...val,
      gridArea: key,
    }));
    return [...arrs, ...items];
  },
});
