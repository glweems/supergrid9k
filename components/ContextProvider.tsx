import theme, { GlobalCSS } from '@lib/theme';
import React from 'react';
import { ThemeProvider } from 'styled-components';

const ContextProvider: React.FC = ({ children }) => {
  //console.log('auth: ', auth);
  return (
    <ThemeProvider theme={theme}>
      <GlobalCSS />
      {children}
    </ThemeProvider>
  );
};

export default ContextProvider;
