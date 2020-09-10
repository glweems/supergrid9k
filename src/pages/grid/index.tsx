import Link from 'next/link';
import React from 'react';
import { withErrorBoundary } from 'react-error-boundary';
import Id from 'react-id-generator';
import { useQuery } from 'react-query';
import ErrorFallback from '../../components/ErrorFallback';
import { getGrids } from '../../lib/GridApi';
import { GridState } from '../../store/grid';

interface GridFeedProps {
  grids: GridState[];
}

const GridFeed = (props: GridFeedProps) => {
  const { data, isLoading } = useQuery('posts', getGrids, { initialData: props.grids });

  if (isLoading) return <div>loading</div>;
  return (
    <div>
      feed
      {data?.map((item) => (
        <div key={Id()}>
          <Link href={`/grid/${item._id}`}>{item._id}</Link>
          <img src={`/api/grid/${item._id}`} />
        </div>
      ))}
    </div>
  );
};
export async function getStaticProps() {
  const grids = await getGrids();

  return { props: { grids } };
}

export default withErrorBoundary(GridFeed, { fallbackRender: ErrorFallback });
