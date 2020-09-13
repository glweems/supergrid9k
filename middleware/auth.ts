import useSWR from 'swr';
import nextConnect from 'next-connect';
import passport from '@/lib/passport';
import session from './session';
import dbConnect from '../lib/dbConnect';

export const fetcher = (url: string) => fetch(url).then((r) => r.json());
export function useUser() {
  const { data, mutate } = useSWR('/api/user', fetcher);
  // if data is not defined, the query has not completed
  const loading = !data;
  const user = data?.user;
  return [user, { mutate, loading }];
}

const auth = nextConnect()
  .use(passport)
  .use(
    session({
      name: 'sess',
      secret: 'some_not_random_password_that_is_at_least_32_characters', // This should be kept securely, preferably in env vars
      cookie: {
        maxAge: 60 * 60 * 8, // 8 hours,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        sameSite: 'lax',
      },
    })
  )

  .use(passport.initialize())
  .use(passport.session());

export default auth;
