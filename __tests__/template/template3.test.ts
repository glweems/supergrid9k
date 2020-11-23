import { template } from '../../css-grid-template-parser';

test('should build a template from a grid object', () => {
  const grid = {
    width: 6,
    height: 6,
    areas: {
      a: {
        column: { start: 2, end: 4, span: 2 },
        row: { start: 2, end: 4, span: 2 },
      },
      b: {
        column: { start: 4, end: 6, span: 2 },
        row: { start: 4, end: 6, span: 2 },
      },
    },
  };

  const test = template(grid);
  const expected = `". . . . . ."\n". a a . . ."\n". a a . . ."\n". . . b b ."\n". . . b b ."\n". . . . . ."`;

  expect(test).toBe(expected);
});
