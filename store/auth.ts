import { atom, useRecoilState } from 'recoil';
import { SuperGrid9kUser } from '../lib/auth/mapUserData';

export const auth = atom<
  null | SuperGrid9kUser | (SuperGrid9kUser & { done: boolean })
>({
  key: 'auth',
  default: null,
});

export function useUser() {
  const [userState] = useRecoilState(auth);

  return userState;
}
