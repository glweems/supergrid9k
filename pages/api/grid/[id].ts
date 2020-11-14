import Grid from '@models/Grid';
import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import { dbMiddleware } from '@lib/apiHelpers';
import authMiddleware from '@lib/auth/authMiddleware';
import { SuperGrid9kUser } from '@lib/auth/mapUserData';
export interface AuthApiRequest extends NextApiRequest {
  user?: SuperGrid9kUser;
}

function onNoMatch(_req, res) {
  res.status(404).end('page is not found... or is it');
}

const handler = nc<AuthApiRequest, NextApiResponse>({ onNoMatch })
  .use(authMiddleware)
  .use(dbMiddleware)
  .get((req, res) => {
    Grid.findById(req.query.id)
      .then((grid) => res.status(200).json(grid))
      .catch((err) => res.status(404).json(err));
  });

export default handler;
