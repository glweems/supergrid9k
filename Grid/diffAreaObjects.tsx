import { Area, track } from 'css-grid-template-parser';
export default function diffAreaObjects(previous: Area, curr?: Area): Area {
  const area: Area = {
    row: track(
      previous.row.start <= curr.row.start
        ? previous.row.start
        : curr.row.start,
      previous.row.end >= curr.row.end ? previous.row.end : curr.row.end
    ),
    column: track(
      previous.column.start <= curr.column.start
        ? previous.column.start
        : curr.column.start,
      previous.column.end >= curr.column.end
        ? previous.column.end
        : curr.column.end
    ),
  };

  return area;
}
