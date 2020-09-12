import { NextApiResponse } from 'next';
import withPassport from '../../../lib/withPassport';

const handler = (req, res: NextApiResponse) => {
  req.logout();

  res?.writeHead(302, {
    Location: '/',
  });

  res.end();
};

export default withPassport(handler);
