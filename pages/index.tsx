import { fetcher } from '@lib/fetcher';
import Navbar from '@ui/Navbar';
import { GetServerSideProps, NextPage } from 'next';
import React from 'react';
import Div100Vh from 'react-div-100vh';
import GridEditor from '../Grid/GridEditor';
import { AppConfig } from './api/grid/template';

export const getServerSideProps: GetServerSideProps = async () => {
  const data = await fetcher<AppConfig>('/api/grid/template');
  return { props: data };
};

const IndexPage: NextPage<AppConfig> = ({ grid }) => {
  return (
    <Div100Vh>
      <Navbar />
      <GridEditor data={grid} />
    </Div100Vh>
  );
};

IndexPage.displayName = 'IndexPage';

export default IndexPage;
