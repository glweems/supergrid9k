import { NextPage } from 'next';
import React from 'react';
import Div100vh from 'react-div-100vh';
import ContextProvider from '../components/ContextProvider';

import GridEditor from '../components/GridEditor/GridEditor';
import { defaultGridState } from '../lib/utils';
import Navbar from '../ui/Navbar';

const IndexPage: NextPage = () => {
  const initialState = {
    ...defaultGridState,
    initialState: defaultGridState,
  };
  return (
    <ContextProvider>
      <Div100vh>
        <Navbar headingProps={{ color: '#fff', fontWeight: 'bold' }} />
        <GridEditor grid={initialState} />
      </Div100vh>
    </ContextProvider>
  );
};

export default IndexPage;
