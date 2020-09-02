import { GetStaticProps } from 'next';
import React from 'react';
import { withErrorBoundary } from 'react-error-boundary';
import { useGrid } from '../../lib/GridApi';
import ErrorFallback from '../../components/ErrorFallback';
import GridEditor from '../../components/GridEditor/GridEditor';

export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: {
      id: context.params?.id,
    },
  };
};

export async function getStaticPaths() {
  return {
    paths: ['/grid/id'],
    fallback: true,
  };
}

const GridPage: React.FC<{ id: string }> = ({ id }) => {
  const { isLoading, error } = useGrid(id);
  if (error) return <div>{error}</div>;
  if (isLoading) return <div>loading</div>;

  return <GridEditor />;
};
export default withErrorBoundary(GridPage, { FallbackComponent: ErrorFallback });

// <CodeBlock language="json" code={JSON.stringify(gridState, null, 2)} />
