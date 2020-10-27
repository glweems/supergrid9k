import { track } from 'css-grid-template-parser';
import { GridItemProps } from '@components/GridEditor/GridItem';

export default function areaFromGridItems(
  areaStart: GridItemProps,
  areaEnd: GridItemProps
): Omit<GridItemProps, 'index' | 'name' | 'gridArea'> {
  const direction = areaStart.index < areaEnd.index ? 'ltr' : 'rtl';

  switch (direction) {
    case 'rtl':
      const initialNewAreartl = {
        row: track(areaStart.row.start, areaEnd.column.end),
        column: track(
          areaEnd.row.end,

          areaStart.column.start
        ),
      };
      return initialNewAreartl;
      break;

    default:
      const initialNewArea = {
        row: track(areaStart.row.start, areaEnd.row.end),
        column: track(areaStart.column.start, areaEnd.column.end),
      };
      return initialNewArea;
  }
}
