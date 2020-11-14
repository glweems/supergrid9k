import Grid from '@models/Grid';
import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import { dbMiddleware } from '@lib/apiHelpers';
export type AuthApiRequest = NextApiRequest;

function onNoMatch(_req, res) {
  res.status(404).end('page is not found... or is it');
}

const handler = nc<AuthApiRequest, NextApiResponse>({ onNoMatch })
  .use(dbMiddleware)
  .get((req, res) => {
    Grid.findById(req.query.id)
      .then((grid) => res.status(200).json(grid))
      .catch((err) => res.status(404).json(err));
  });

export default handler;
