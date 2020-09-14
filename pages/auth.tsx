import GridEditor from '@/components/GridEditor/GridEditor';
import { defaultGridState } from '@/lib/utils';
import Navbar from '@/ui/Navbar';
import React from 'react';
import Div100vh from 'react-div-100vh';
import { useRecoilState } from 'recoil';
import { auth } from '@/store/auth';
import FirebaseAuth from '@/components/FirebaseAuth';
export default function IndexPage() {
  return (
    <Div100vh>
      <FirebaseAuth />
    </Div100vh>
  );
}
// <Navbar title="super grid 9k" />

// <GridEditor grid={{ ...defaultGridState, initialState: defaultGridState }} />
