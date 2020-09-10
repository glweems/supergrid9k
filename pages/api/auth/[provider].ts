import { NextApiResponse, NextApiRequest } from 'next';
import withPassport, { passport } from '@/lib/withPassport';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { provider } = req.query;
  if (!provider) {
    res.status(400);
  }

  try {
    await passport.authenticate(provider)(req, res, (...args) => {
      console.log('passport authenticated', args);
    });
  } catch (err) {
    return res.status(500);
  }
};

export default withPassport(handler);
