import { NextApiRequest, NextApiResponse } from 'next';
import { RequestHandler } from 'next-connect';
import dbConnect from './dbConnect';

export function dbError<T = any>(err: T) {
  return { error: JSON.stringify(err) };
}

export const dbMiddleware: RequestHandler<
  NextApiRequest,
  NextApiResponse
> = async (_req, _res, next) => {
  await dbConnect();
  next();
};
