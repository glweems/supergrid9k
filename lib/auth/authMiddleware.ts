import { NextApiRequest, NextApiResponse } from 'next';
import { RequestHandler } from 'next-connect';
import cookie from 'next-cookies';
import initFirebase from './initFirebase';
import { SuperGrid9kUser } from './mapUserData';

const authMiddleware: RequestHandler<NextApiRequest & { user: SuperGrid9kUser }, NextApiResponse> = (
  req,
  res,
  next
) => {
  const { auth } = cookie({ req });

  req.user = auth as any;
  next();
};

export default authMiddleware;
