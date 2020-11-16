import { Entry, flatten } from '../css-grid-template-parser';

test('it should create as string an object array with amount and unit keys', () => {
  const entries: Entry[] = [
    { amount: 1, unit: 'fr' },
    { amount: 1, unit: 'fr' },
  ];

  const test = flatten(entries);
  const expected = '1fr 1fr';

  expect(test).toBe(expected);
});
test('it should not have a amount if unit is auto', () => {
  const entries: Entry[] = [
    { amount: 0, unit: 'auto' },
    { amount: 1, unit: 'fr' },
  ];

  const test = flatten(entries);
  const expected = 'auto 1fr';

  expect(test).toBe(expected);
});
test('it should return empty string', () => {
  const entries: Entry[] = [];

  const test = flatten(entries);
  const expected = '';

  expect(test).toBe(expected);
});
