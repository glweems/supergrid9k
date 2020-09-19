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
          const newGrid = await Grid.create(req.body).catch((err) => {
            return res.status(500).json(err);
          });

          if (newGrid) return res.status(200).json(newGrid);
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
