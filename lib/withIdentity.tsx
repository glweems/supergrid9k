import { NextPageContext } from 'next';
import nextCookie from 'next-cookies';
import NextApp, { AppContext, AppInitialProps } from 'next/app';
import React from 'react';
import { RecoilRoot } from 'recoil';
import ContextProvider from '../components/ContextProvider';
import { githubSessionToUserObj } from './passport/github';
import redirect from './redirect';

type IdentityProviderProps = Readonly<AppInitialProps> & {
  session: any;
};

const loginPage = '/';

export const redirectToLogin = (ctx: NextPageContext) => {
  if (
    (ctx && ctx.pathname === loginPage) ||
    (typeof window !== 'undefined' && window.location.pathname === loginPage)
  ) {
    return;
  }

  redirect(ctx, loginPage);
};

// any is needed to use as JSX element
const withIdentity = (App: NextApp | any) => {
  return class IdentityProvider extends React.Component<IdentityProviderProps> {
    static displayName = `IdentityProvider(MyApp)`;
    static async getInitialProps(ctx: AppContext): Promise<IdentityProviderProps> {
      // Get inner app's props
      let appProps: AppInitialProps;
      if (NextApp.getInitialProps) {
        appProps = await NextApp.getInitialProps(ctx);
      } else {
        appProps = { pageProps: {} };
      }

      const { passportSession } = nextCookie(ctx.ctx);

      // Redirect to login if page is protected but no session exists
      if (!passportSession) {
        redirectToLogin(ctx.ctx);
        return Promise.resolve({
          pageProps: null,
          session: (null as unknown) as any,
        });
      }

      const serializedCookie = Buffer.from(passportSession, 'base64').toString();

      const {
        passport: { user: ghUser },
      }: {
        passport: { user: any };
      } = JSON.parse(serializedCookie);

      // redirect to login if cookie exists but is empty

      const session = ghUser;
      try {
        // await checkuser(githubSessionToUserObj(ghUser._json)).then((res) => console.log(res));
      } catch (error) {
        console.error(error);
      }
      return {
        ...appProps,
        session,
      };
    }

    render() {
      const { session, ...appProps } = this.props;

      return (
        <RecoilRoot>
          <ContextProvider session={session}>
            <App {...appProps} />
          </ContextProvider>
        </RecoilRoot>
      );
    }
  };
};

export default withIdentity;
