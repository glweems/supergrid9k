import GridEditor from '@/components/GridEditor/GridEditor';
import { fetcher } from '@/lib/fetcher';
import { GridState } from '@/store/grid';
import Navbar from '@/ui/Navbar';
import { GetServerSideProps, NextPage } from 'next';
import React from 'react';
import useSWR from 'swr';

export const getServerSideProps: GetServerSideProps = async () => {
  const data = await fetcher<GridState>(`/api/grid/template`);
  return { props: { data } };
};

const IndexPage: NextPage<{ data: GridState }> = ({ data: initialData }) => {
  const { data, error } = useSWR('/api/grid/template', { initialData });
  if (error) return <div>Whoops!</div>;
  return (
    <>
      <Navbar headingProps={{ color: '#fff', fontWeight: 'bold' }} />
      <GridEditor grid={data} />
    </>
  );
};

export default IndexPage;
