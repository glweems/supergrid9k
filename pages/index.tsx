import GridEditor from '@/components/GridEditor/GridEditor';
import { GridState, RawGridState } from '@/store/grid';
import Navbar from '@/ui/Navbar';
import { GetServerSideProps, NextPage } from 'next';
import React from 'react';
import useSWR from 'swr';
import If from '../components/If';
import { fetcher } from '../lib/fetcher';

const endpoint = '/api/grid/template';
export const getServerSideProps: GetServerSideProps = async () => {
  const data = await fetcher<GridState>(endpoint);
  return { props: { data } };
};

const IndexPage: NextPage<{ data: RawGridState }> = ({ data: initialData }) => {
  const { data, error } = useSWR(endpoint, {
    initialData,
    refreshInterval: 0,
  });

  const isLoading = !data ?? error;

  return (
    <>
      <Navbar headingProps={{ color: '#fff', fontWeight: 'bold' }} />
      <If isTrue={!isLoading}>
        <GridEditor endpoint={endpoint} initialData={data} />
      </If>
    </>
  );
};

export default IndexPage;
