import { NextApiResponse, NextApiRequest } from 'next';
import withPassport, { passport } from '@/lib/withPassport';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { provider } = req.query;
  if (!provider) {
    return { status: 4004 };
  }

  passport.authenticate(provider, {
    failureRedirect: '/',
    successRedirect: '/',
  })(req, res, (...args) => {
    console.log('args: ', args);
    return args;
  });
};

export default withPassport(handler);
