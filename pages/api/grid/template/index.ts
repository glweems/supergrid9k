import { defaultGridState } from '@/lib/utils';
import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';

const json = defaultGridState;
const handler = nc<NextApiRequest, NextApiResponse>().get(async (_req, res) => {
  res.status(200).json(json);
});

export default handler;
