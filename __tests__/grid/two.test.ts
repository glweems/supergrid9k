import { grid } from '../../css-grid-template-parser';

test('should parse the area template', () => {
  const template = `
    ". . . ."
    ". a a ."
    ". a a ."
    ". . . ."
  `;

  const test = grid(template);
  const expected = {
    width: 4,
    height: 4,
    areas: {
      a: {
        column: { start: 2, end: 4, span: 2 },
        row: { start: 2, end: 4, span: 2 },
      },
    },
  };

  expect(test).toEqual(expected);
});
