import React from 'react';
import { RecoilRoot } from 'recoil';
import { ThemeProvider } from 'styled-components/macro';
import RecoilDebugger from '../lib/RecoilDebugger';
import theme from '../lib/theme';

const ContextProvider: React.FC = ({ children }) => {
  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <RecoilRoot>
          <RecoilDebugger />
          {children}
        </RecoilRoot>
      </ThemeProvider>
    </React.Fragment>
  );
};

export default ContextProvider;
