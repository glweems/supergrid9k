import GridEditor from '@/components/GridEditor/GridEditor';
import { fetcher } from '@/lib/fetcher';
import { GridState } from '@/store/grid';
import Navbar from '@/ui/Navbar';
import { GetServerSideProps } from 'next';
import React from 'react';
import Div100vh from 'react-div-100vh';
import useSWR from 'swr';
import LoadingSpinner from '@/components/LoadingSpinner';

export const getServerSideProps: GetServerSideProps = async (req) => {
  const data = await fetcher(`/api/grid/${req.query.id}`);
  return { props: { id: req.query.id, data } };
};

const GridPage: React.FC<{ id: string; data: any }> = ({
  id,
  data: initialData,
}) => {
  const { data, error } = useSWR<GridState>(`/api/grid/${id}`, { initialData });

  if (error) return <div>Whoops! an error occured.</div>;
  if (!data) return <LoadingSpinner />;

  return (
    <Div100vh>
      <Navbar />
      <GridEditor grid={{ ...data, initialState: data }} />
    </Div100vh>
  );
};
export default GridPage;
