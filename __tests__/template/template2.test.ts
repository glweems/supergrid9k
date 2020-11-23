import { template } from '../../css-grid-template-parser';

test('should build a template from a grid object', () => {
  const grid = {
    width: 4,
    height: 4,
    areas: {
      a: {
        column: { start: 1, end: 3, span: 2 },
        row: { start: 1, end: 3, span: 2 },
      },
      b: {
        column: { start: 3, end: 5, span: 2 },
        row: { start: 3, end: 5, span: 2 },
      },
    },
  };

  const test = template(grid);
  const expected = `"a a . ."\n"a a . ."\n". . b b"\n". . b b"`;

  expect(test).toBe(expected);
});
