import { NextApiRequest, NextApiResponse } from 'next';
import passport from '@/lib/passport';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { provider } = req.query;
  if (!provider) {
    res.status(400);
  }

  try {
    await passport.authenticate(provider);
  } catch (err) {
    res.status(500);
  }
};

export default handler;
