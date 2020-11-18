import { template } from '../../css-grid-template-parser';

test('should build a template from a grid object', () => {
  const grid = {
    width: 4,
    height: 3,
    areas: {
      a: {
        column: { start: 1, end: 4, span: 3 },
        row: { start: 1, end: 4, span: 3 },
      },
      b: {
        column: { start: 4, end: 5, span: 1 },
        row: { start: 1, end: 4, span: 3 },
      },
    },
  };

  const test = template(grid);
  const expected = `"a a a b"\n"a a a b"\n"a a a b"`;

  expect(test).toBe(expected);
});
