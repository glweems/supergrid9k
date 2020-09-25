import { defaultGridState } from '@/lib/utils';
import { NextApiResponse } from 'next';
import nc from 'next-connect';
import authMiddleware from '../../../lib/auth/authMiddleware';
import { AuthApiRequest } from './[id]';

const json = defaultGridState;
const handler = nc<AuthApiRequest, NextApiResponse>()
  .use(authMiddleware)
  .get(async (_req, res) => {
    res.status(200).json(json);
  });

export default handler;
