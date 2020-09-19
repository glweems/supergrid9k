import dbConnect from '@/lib/dbConnect';
import Grid from '@/models/Grid';
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import authMiddleware from '../../../lib/auth/authMiddleware';
import { SuperGrid9kUser } from '../../../lib/auth/mapUserData';
interface AuthApiRequest extends NextApiRequest {
  user?: SuperGrid9kUser;
}

function onNoMatch(req, res) {
  res.status(404).end('page is not found... or is it');
}

const handler = nc<AuthApiRequest, NextApiResponse>({ onNoMatch })
  .use(authMiddleware)
  .get(async (req, res) => {
    await dbConnect();
    console.log('USER', req.user);
    await Grid.findById(req.query.id).then((g) => {
      return res.status(200).json(g);
    });
  });

const hasdndler: NextApiHandler = async (req, res) => {
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
