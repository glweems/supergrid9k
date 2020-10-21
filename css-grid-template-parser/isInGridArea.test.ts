import isInGridArea from './isInGridArea';
import { track } from './primitives';
import template from './template';
import { Area } from './types';

test('in bounds', () => {
  const bounds: Area = {
    row: track(1, 3),
    column: track(1, 3),
  };
  const target: Area = {
    row: track(1, 2),
    column: track(1, 2),
  };

  console.log(template({ width: 5, height: 5, areas: { b: bounds } }));
  console.log(
    template({
      width: 2,
      height: 2,
      areas: {},
    })
  );

  expect(isInGridArea(bounds, target)).toBeDefined();
});

test('not in bounds', () => {
  const bounds: Area = {
    row: track(1, 3),
    column: track(1, 3),
  };
  const target: Area = {
    row: track(2, 3),
    column: track(2, 3),
  };

  console.log(
    template({ width: 2, height: 3, areas: { b: bounds, t: target } })
  );
  console.log(template({ width: 3, height: 3, areas: { b: bounds } }));

  // expect(isInGridArea(bounds, target)).toBeFalsy();
});
