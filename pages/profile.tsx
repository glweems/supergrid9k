import { Router } from 'next/router';
import React, { useEffect } from 'react';
import { useUser } from '../middleware/auth';

interface Props {}

const Profile = (props: Props) => {
  console.log(props);
  const [user, { loading }] = useUser();

  useEffect(() => {
    // redirect user to login if not authenticated
    if (!loading && !user) Router.replace('/login');
  }, [user, loading]);
  return <div></div>;
};

export default Profile;
