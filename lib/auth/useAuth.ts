import firebase from 'firebase/app';
import 'firebase/auth';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { auth } from '../../store/auth';
import initFirebase from './initFirebase';
import mapUserData, { SuperGrid9kUser } from './mapUserData';
import {
  getUserFromCookie,
  removeUserCookie,
  setUserCookie,
} from './userCookies';

initFirebase();

export default function useAuth() {
  const [authState, setAuthState] = useRecoilState(auth);
  const [user, setUser] = useState<SuperGrid9kUser | undefined>(undefined);
  const router = useRouter();

  useEffect(() => {
    // Firebase updates the id token every hour, this
    // makes sure the react state and the cookie are
    // both kept up to date
    const cancelAuthListener = firebase.auth().onIdTokenChanged((obj) => {
      if (obj) {
        const userData = mapUserData(obj);
        setUserCookie(userData);
        setUser(userData);
        setAuthState(userData);
      } else {
        removeUserCookie();
        setUser(undefined);
        setAuthState(null);
      }
    });

    const userFromCookie = getUserFromCookie();
    if (!userFromCookie && authState !== null) {
      router.push('/auth');
      return;
    }
    setUser(userFromCookie);
    setAuthState(userFromCookie);

    return () => {
      cancelAuthListener();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const loading = user === undefined ? true : false;

  return { user, loading };
}
