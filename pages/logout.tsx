import firebase from 'firebase';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';

const LogoutPage: NextPage = () => {
  const router = useRouter();

  React.useEffect(() => {
    async function logout() {
      return firebase
        .auth()
        .signOut()
        .then(() => {
          // Sign-out successful.
          router.push('/auth');
        })
        .catch((e) => {
          console.error(e);
        });
    }
    logout();
  });

  return null;
};

export default LogoutPage;
