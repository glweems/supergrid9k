import { GridState } from 'css-grid-template-parser';
import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';

export interface AppConfig {
  name: string;
  grid: GridState;
}
/* TODO - useCssRepeatFn: false,  */
/* TODO - gridContainerClassName: 'grid', */

const json: AppConfig = {
  name: 'Grid',
  grid: {
    areas: {},
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
