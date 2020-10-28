import { Area, track } from 'css-grid-template-parser';
import { selector } from 'recoil';
import { gridState } from './gridState';
import { gridCssState } from './gridCssState';
import { GridAreaObject } from './GridAreas';
import gridAreaStr from './gridAreaStr';

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
        return rowStr.split(' ').map((name, colStart) => {
          const area: Area = {
            row: track(rowStart + 1, rowStart + 2),
            column: track(colStart + 1, colStart + 2),
          };
          const gridArea = gridAreaStr(area);
          return {
            name,
            gridArea,
            ...area,
            style: { zIndex: 1 },
          };
        });
      });

    const arrs = Object.entries(grid.areas)?.map(([name, area]) => ({
      ...area,
      name,
      gridArea: gridAreaStr(area),
      style: { zIndex: 100 },
    }));
    return [...arrs, ...items];
  },
});
