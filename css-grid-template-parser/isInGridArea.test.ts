import isInGridArea from './isInGridArea';
import template from './template';
import { Area } from './types';

test('in bounds', () => {
  const bounds: Area = {
    row: { start: 1, end: 3, span: 2 },
    column: { start: 1, end: 3, span: 2 },
  };
  const target: Area = {
    row: { start: 1, end: 2, span: 1 },
    column: { start: 1, end: 2, span: 1 },
  };

  console.log(
    `${template({ width: 5, height: 5, areas: { b: bounds } })} ${template({
      width: 2,
      height: 2,
      areas: {},
    })}`
  );

  expect(isInGridArea(bounds, target)).toBeDefined();
});

test('not in bounds', () => {
  const bounds: Area = {
    row: { start: 1, end: 3, span: 2 },
    column: { start: 1, end: 3, span: 2 },
  };
  const target: Area = {
    row: { start: bounds.row.end - 1, end: 5, span: 1 },
    column: { start: 1, end: 2, span: 1 },
  };

  console.log(template({ width: 5, height: 5, areas: { t: target } }));
  console.log(template({ width: 5, height: 5, areas: { b: bounds } }));

  expect(isInGridArea(bounds, target)).toBeFalsy();
});
