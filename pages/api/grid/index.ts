import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/dbConnect';
import Grid from '@/models/Grid';

export default async function (req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();
  switch (req.method) {
    case 'GET':
      {
        try {
          const grids = await Grid.find(req.query);
          return res.status(200).json(grids);
        } catch (err) {
          res.status(500).json(err);
        }
      }
      break;
    case 'POST':
      {
        try {
          return await Grid.create(req.body).then((created) => res.status(200).json(created));
        } catch (err) {
          res.status(400).json({ err });
        }
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
