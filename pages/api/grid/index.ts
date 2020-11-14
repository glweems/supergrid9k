import { dbMiddleware } from '@lib/apiHelpers';
import Grid from '@models/Grid';
import { NextApiResponse } from 'next';
import nc from 'next-connect';
import { AuthApiRequest } from './[id]';

const handler = nc<AuthApiRequest, NextApiResponse>()
  .use(dbMiddleware)
  .get((req, res) => {
    Grid.find(req.query)
      .then((grid) => res.status(200).json(grid))
      .catch((err) => res.status(404).json(err));
  })
  .post((req, res) => {
    Grid.create(req.body).then((grid) => res.status(201).json(grid));
  });

export default handler;
