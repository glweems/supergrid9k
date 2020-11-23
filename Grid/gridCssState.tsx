import { groupRepeatedUnits, template } from 'css-grid-template-parser';
import { selector } from 'recoil';
import { gridState } from './gridState';

export const gridCssState = selector({
  key: 'gridCss',
  get: ({ get }) => {
    const grid = get(gridState);
    if (!grid) return;

    const { rows, columns, areas, gap } = grid;
    const rowGap = `${gap.rowGap.amount}${gap.rowGap.unit}`;
    const columnGap = `${gap.columnGap.amount}${gap.columnGap.unit}`;
    const gridObj = {
      width: columns.length,
      height: rows.length,
      areas: Object.fromEntries(
        Object.entries(areas).map(([key, val]) => [key, val])
      ),
    };
    return {
      gridTemplateRows: groupRepeatedUnits(rows),
      gridTemplateColumns: groupRepeatedUnits(columns),
      gridTemplateAreas: template(gridObj),
      gridGap: [rowGap, columnGap].join(' '),
      bg: 'bg.grayDark',
    };
  },
});
