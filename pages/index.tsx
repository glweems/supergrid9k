import { NextPage } from 'next';
import React from 'react';
import Div100vh from 'react-div-100vh';

import GridEditor from '../components/GridEditor/GridEditor';
import { defaultGridState } from '../lib/utils';
import Navbar from '../ui/Navbar';

const IndexPage: NextPage = (props) => {
  console.log(props);
  const initialState = {
    ...defaultGridState,
    initialState: defaultGridState,
  };
  return (
    <Div100vh>
      <Navbar title="Super Grid 9K" headingProps={{ color: '#fff', fontWeight: 'bold' }} />
      <GridEditor grid={initialState} />
    </Div100vh>
  );
};

export default IndexPage;
