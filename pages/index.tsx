import GridEditor from '@/components/GridEditor/GridEditor';
import { defaultGridState } from '@/lib/utils';
import Navbar from '@/ui/Navbar';
import React from 'react';
import Div100vh from 'react-div-100vh';
import { useRecoilState } from 'recoil';
import { auth } from '@/store/auth';
export default function IndexPage() {
  const [user] = useRecoilState(auth);
  console.log('user: ', user);

  return (
    <Div100vh>
      <Navbar title="super grid 9k" />
      <GridEditor grid={{ ...defaultGridState, initialState: defaultGridState }} />
    </Div100vh>
  );
}
