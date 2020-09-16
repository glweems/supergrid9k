import firebase from 'firebase/app';

export interface SessionUser extends firebase.User {
  xa?: string;
}

export interface SuperGrid9kUser {
  id: string;
  displayName: string;
  photoURL: string;
  email: string;
  phoneNumber: string;
  token: string;
}

/**
 * Maps user data
 * @param user
 * @returns
 */
export default function mapUserData({ uid: id, email, xa: token, providerData }: SessionUser): SuperGrid9kUser {
  const displayName = providerData?.find(({ displayName }) => displayName !== null)?.displayName;
  const photoURL = providerData?.find(({ photoURL }) => photoURL !== null).photoURL ?? '/public/avatar.png';
  const phoneNumber = providerData?.find(({ phoneNumber }) => phoneNumber !== null)?.phoneNumber;

  return {
    id,
    email,
    displayName,
    photoURL,
    token,
    phoneNumber,
  };
}
