import GridEditor from '@/components/GridEditor/GridEditor';
import { GridState, GridTemplateEntry } from '@/store/grid';
import Navbar from '@/ui/Navbar';
import { GetServerSideProps, NextPage } from 'next';
import React from 'react';
import { SWRConfig } from 'swr';
import { fetcher } from '../lib/fetcher';
import gridTemplateParser from '../lib/gridTemplateParser';

export const getServerSideProps: GetServerSideProps = async () => {
  const data = await fetcher<GridState>(`/api/grid/template`);
  return { props: { data } };
};

const gridFetcher = async (input, info) =>
  fetcher(input, info).then(
    ({ useCssRepeatFn, name, gridContainerClassName, ...state }) => {
      const gridTemplateRows = gridTemplateParser(state.gridTemplateRows);
      const gridTemplateColumns = gridTemplateParser(state.gridTemplateColumns);
      const gridGap = gridTemplateParser(state.gridGap) as [
        GridTemplateEntry,
        GridTemplateEntry
      ];
      const grid: GridState = {
        name,
        useCssRepeatFn,
        gridContainerClassName,
        gridTemplateRows,
        gridTemplateColumns,
        gridGap,
        width: gridTemplateRows.length,
        height: gridTemplateColumns.length,
        areas: {},
      };

      return grid;
    }
  );

const IndexPage: NextPage<{ data: GridState }> = ({ data: initialData }) => {
  return (
    <>
      <Navbar headingProps={{ color: '#fff', fontWeight: 'bold' }} />
      <SWRConfig
        value={{
          refreshInterval: 0,
          fetcher: gridFetcher,
          revalidateOnFocus: false,
          revalidateOnMount: false,
          shouldRetryOnError: false,
        }}
      >
        <GridEditor endpoint="/api/grid/template" initialData={initialData} />
      </SWRConfig>
    </>
  );
};

export default IndexPage;
