import GridEditor from '@/components/GridEditor/GridEditor';
import Navbar from '@/ui/Navbar';
import { RawGridState } from 'css-grid-template-parser';
import { GetServerSideProps, NextPage } from 'next';
import React from 'react';
import { GridState } from '../components/GridEditor/GridState';
import { fetcher } from '../lib/fetcher';

const endpoint = '/api/grid/template';
export const getServerSideProps: GetServerSideProps = async () => {
  const data = await fetcher<RawGridState>(endpoint);
  return { props: { data } };
};

const IndexPage: NextPage<{ data: RawGridState }> = ({
  data: initialValues,
}) => {
  const gridState = new GridState(initialValues);

  return (
    <React.Fragment>
      <Navbar />
      <GridEditor initialValues={gridState} />
    </React.Fragment>
  );
};

export default IndexPage;
