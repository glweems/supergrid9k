import GridEditor from '@/components/GridEditor/GridEditor';
import Navbar from '@/ui/Navbar';
import { RawGridState } from 'css-grid-template-parser';
import { FormikProvider, useFormik } from 'formik';
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

  const formikBag = useFormik<GridState>({
    initialValues: gridState,
    onSubmit: (values, helper) => {
      console.log(values);
    },
  });

  return (
    <>
      <Navbar headingProps={{ color: '#fff', fontWeight: 'bold' }} />
      <FormikProvider value={formikBag}>
        <GridEditor
          endpoint={endpoint}
          initialValues={gridState}
          test={gridState}
        />
      </FormikProvider>
    </>
  );
};

export default IndexPage;
