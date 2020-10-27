import areasOverlap from './areasOverlap';
import { track } from './primitives';
import { Area } from './types';

test('has collision', () => {
  const bounds: Area = {
    row: track(1, 3),
    column: track(1, 3),
  };
  const target: Area = {
    row: track(1, 2),
    column: track(1, 2),
  };
  const collision = areasOverlap(bounds, target);
  expect(collision).toBeTruthy();
});

test('avoids collison', () => {
  const bounds: Area = {
    row: track(1, 3),
    column: track(1, 10),
  };
  const target: Area = {
    row: track(3, 5),
    column: track(3, 5),
  };

  const collision = areasOverlap(bounds, target);
  expect(collision).toBeFalsy();
});
