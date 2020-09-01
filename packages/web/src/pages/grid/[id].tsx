import { useRouter } from 'next/dist/client/router';
import React from 'react';
import { withErrorBoundary } from 'react-error-boundary';
import { useGrid } from '../../api.ts/GridApi';
import ErrorFallback from '../../components/ErrorFallback';
import GridEditor from '../../components/GridEditor/GridEditor';

const GridPage: React.FC = () => {
  const router = useRouter();
  const { isLoading, error } = useGrid(router.query.id as string);

  if (error) return <div>{error}</div>;
  if (isLoading) return <div>loading</div>;

  return <GridEditor />;
};
export default withErrorBoundary(GridPage, { FallbackComponent: ErrorFallback });

// <CodeBlock language="json" code={JSON.stringify(gridState, null, 2)} />
