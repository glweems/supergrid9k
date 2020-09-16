import GridEditor from '@/components/GridEditor/GridEditor';
import { GetServerSideProps } from 'next';
import React from 'react';
import Div100vh from 'react-div-100vh';
import useSWR from 'swr';
import { hostingURL } from '@/lib/appConfig';
import { GridState } from '@/store/grid';
import Navbar from '@/ui/Navbar';
async function fetcher<JSON = any>(input: RequestInfo, init?: RequestInit): Promise<JSON> {
  const res = await fetch(input, init);
  return res.json();
}

export const getServerSideProps: GetServerSideProps = async (req) => {
  const data = await fetcher(`${hostingURL}/api/grid/${req.query.id}`);
  return { props: { id: req.query.id, data } };
};

const GridPage: React.FC<{ id: string; data: any }> = ({ id, data: initialData }) => {
  const { data } = useSWR<GridState>(`/api/grid/${id}`, id && fetcher, { initialData, suspense: true });
  if (!data) return <div>loading</div>;

  return (
    <Div100vh>
      <Navbar />
      <GridEditor grid={{ ...data, initialState: data }} />
    </Div100vh>
  );
};
export default GridPage;

// <CodeBlock language="json" code={JSON.stringify(gridState, null, 2)} />
