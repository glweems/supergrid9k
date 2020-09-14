import { NextApiResponse, NextApiRequest } from 'next';
import withPassport, { passport } from '@/lib/passport/withPassport';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { provider } = req.query;
  if (!provider) {
    return { statusCode: 404 };
  }

  await passport.authenticate(provider)(req, res, (...args) => {
    console.log('passport authenticated', args);
  });
};

export default withPassport(handler);
