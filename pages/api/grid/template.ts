import { NextApiResponse } from 'next';
import nc from 'next-connect';
import { defaultGridState } from '@/lib/utils';
import { makeDefaultGrid } from '@/store/grid';
import { AuthApiRequest } from './[id]';

const json = makeDefaultGrid(defaultGridState);
const handler = nc<AuthApiRequest, NextApiResponse>().get(async (req, res) => {
  res.status(200).json({ ...json, owner: { ...req.user } });
});

export default handler;
