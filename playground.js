const grid = {
  areas: {
    div: {
      row: {
        start: 1,
        end: 2,
        span: 1,
      },
      column: {
        start: 1,
        end: 2,
        span: 1,
      },
    },
    span: {
      row: {
        start: 2,
        end: 5,
        span: 3,
      },
      column: {
        start: 2,
        end: 5,
        span: 3,
        bg: 'red.1',
      },
    },
  },
  rows: [
    {
      amount: 1,
      unit: 'fr',
    },
    {
      amount: 1,
      unit: 'fr',
    },
    {
      amount: 1,
      unit: 'fr',
    },
  ],
  columns: [
    {
      amount: 1,
      unit: 'fr',
    },
    {
      amount: 1,
      unit: 'fr',
    },
    {
      amount: 1,
      unit: 'fr',
    },
  ],
  gap: {
    rowGap: {
      amount: 10,
      unit: 'px',
    },
    columnGap: {
      amount: 10,
      unit: 'px',
    },
  },
};

function isDivideBy(number, a, b) {
  return number % a === 0 && number % b === 0;
}
const show = 3 % grid.rows.length === 0;
console.log('show: ', show);
console.log(
  'isDivideBy: ',
  isDivideBy(3, grid.rows.length, grid.columns.length)
);

console.log();
