// import theme from '@lib/theme';
import React from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components/macro';
import useAuth from '../lib/auth/useAuth';
import { UserContextProvider } from '../lib/User';
import { BaseStyles } from '@primer/components';
import { RecoilRoot } from 'recoil';
import theme from '../lib/theme';
interface ContextProviderProps {
  session?: any;
}
const ContextProvider: React.FC<ContextProviderProps> = ({ children }) => {
  const { user } = useAuth();
  //console.log('auth: ', auth);
  return (
    <BaseStyles>
      <ThemeProvider theme={theme}>
        <GlobalCSS />
        <UserContextProvider value={user}>{children}</UserContextProvider>
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
