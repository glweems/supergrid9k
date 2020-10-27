import { fetcher } from '@lib/fetcher';
import Navbar from '@ui/Navbar';
import { GetServerSideProps } from 'next';
import React from 'react';
import Div100vh from 'react-div-100vh';
import CodeBlock from '@components/CodeBlock';
import { GridState } from '../../css-grid-template-parser/GridState';

export const getServerSideProps: GetServerSideProps = async (req) => {
  const data = await fetcher(`/api/grid/${req.query.id}`);
  return { props: { id: req.query.id, data } };
};

const GridPage: React.FC<{ id: string; data: any }> = ({
  id,
  data: initialValues,
}) => {
  const gridState = new GridState(initialValues);

  return (
    <Div100vh>
      <Navbar headingProps={{ color: '#fff', fontWeight: 'bold' }} />
      <CodeBlock
        language="json"
        code={JSON.stringify({ id, gridState, initialValues }, null, 2)}
      />
    </Div100vh>
  );
};
export default GridPage;
