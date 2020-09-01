import React from 'react';
import { ReactQueryDevtools } from 'react-query-devtools';
import { RecoilRoot } from 'recoil';
import { ThemeProvider } from 'styled-components/macro';
import theme from '../lib/theme';
const ContextProvider: React.FC = ({ children }) => {
  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <RecoilRoot>{children}</RecoilRoot>
      </ThemeProvider>
      <ReactQueryDevtools />
    </React.Fragment>
  );
};

export default ContextProvider;
