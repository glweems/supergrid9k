import { GridState, track } from 'css-grid-template-parser';
import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';

export interface AppConfig {
  name: string;
  grid: GridState;
}

// useCssRepeatFn: false,
// gridContainerClassName: 'grid',

const json: AppConfig = {
  name: 'Grid',
  grid: {
    areas: {
      /* div: {
        row: track(1, 2),
        column: track(1, 2),
      },
      span: {
        row: track(2, 5),
        column: { ...track(2, 5), bg: 'red.1' },
      }, */
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
  },
};

const handler = nc<NextApiRequest, NextApiResponse<AppConfig>>().get(
  async (_req, res) => {
    res.status(200).json(json);
  }
);

export default handler;
