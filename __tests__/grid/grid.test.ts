import { grid } from '../../css-grid-template-parser';

test('should parse the area template', () => {
  const template = `
      "a a . b"
      "a a . b"
      'a a . b'
    `;

  const test = grid(template);
  const expected = {
    width: 4,
    height: 3,
    areas: {
      a: {
        column: { start: 1, end: 3, span: 2 },
        row: { start: 1, end: 4, span: 3 },
      },
      b: {
        column: { start: 4, end: 5, span: 1 },
        row: { start: 1, end: 4, span: 3 },
      },
    },
  };

  expect(test).toEqual(expected);
});
