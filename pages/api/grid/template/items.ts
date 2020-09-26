import { defaultGridState } from '@/lib/utils';
import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import { makeGridAreas, makeGridCss } from '@/store/grid';

const json = {
  gridItems: makeGridAreas(defaultGridState),
  gridCss: makeGridCss(defaultGridState),
};
const handler = nc<NextApiRequest, NextApiResponse>().get(async (_req, res) => {
  res.status(200).json(json);
});

export default handler;
