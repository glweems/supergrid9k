import { NextApiResponse, NextApiRequest } from 'next';
import withPassport, { passport } from '@/lib/passport/withPassport';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { provider } = req.query;

  return await passport.authenticate(provider, {
    failureRedirect: '/',
    successRedirect: '/',
  })(req, res, (...args) => {
    console.log('args: ', args);
    res.end(args);
  });
};

export default withPassport(handler);
