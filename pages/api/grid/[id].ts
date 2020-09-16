import { NextApiHandler } from 'next';
import dbConnect from '@/lib/dbConnect';
import Grid from '@/models/Grid';

const handler: NextApiHandler = async (req, res) => {
  if (!req.query.id) {
    return res.status(300).send('missing id');
  }
  await dbConnect();

  switch (req.method) {
    case 'GET': {
      try {
        await Grid.findById(req.query.id).then((g) => {
          return res.status(200).json(g);
        });
      } catch (error) {
        return res.status(500).json(error);
      }
    }
  }
};

export default handler;
