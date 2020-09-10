import { NextApiHandler } from 'next';
import dbConnect from '@/lib/dbConnect';
import Grid from '@/models/Grid';

const handle: NextApiHandler = async (req, res) => {
  const {
    query: { id },
    method,
  } = req;

  await dbConnect();

  switch (method) {
    case 'GET': {
      try {
        const grid = await Grid.findById(id);
        if (!grid) {
          return res.status(400).json({ success: false });
        }
        return res.status(200).json(grid);
      } catch (err) {
        res.status(400).json({ err });
      }
    }
  }
};

export default handle;
