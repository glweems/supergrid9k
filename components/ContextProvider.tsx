import theme from '@lib/theme';
import { BaseStyles } from '@primer/components';
import React from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components/macro';
interface ContextProviderProps {
  session?: any;
}
const ContextProvider: React.FC<ContextProviderProps> = ({ children }) => {
  //console.log('auth: ', auth);
  return (
    <BaseStyles>
      <ThemeProvider theme={theme}>
        <GlobalCSS />
        {children}
      </ThemeProvider>
    </BaseStyles>
  );
};

const GlobalCSS = createGlobalStyle`


  ::-webkit-scrollbar {
    width: 8px; /* 1px wider than Lion. */
    /* This is more usable for users trying to click it. */
    background-color: rgba(0, 0, 0, 0);
  }
  /* hover effect for both scrollbar area, and scrollbar 'thumb' */
  ::-webkit-scrollbar:hover {
    background-color: rgba(0, 0, 0, 0.09);
  }

  /* The scrollbar 'thumb' ...that marque oval shape in a scrollbar */
  ::-webkit-scrollbar-thumb:vertical {
    /* This is the EXACT color of Mac OS scrollbars.
     Yes, I pulled out digital color meter */
    background: rgba(0, 0, 0, 0.5);
  }
  ::-webkit-scrollbar-thumb:vertical:active {
    background: rgba(0, 0, 0, 0.61); /* Some darker color when you click it */
  }
`;

export default ContextProvider;
