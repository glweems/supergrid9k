import Analytics from 'analytics';
import googleAnalytics from '@analytics/google-analytics';
import ReactGA from 'react-ga';

export const initGA = () => {
  console.log('GA init');
  typeof document !== 'undefined' && ReactGA.initialize('UA-175519886-1');
};
export const logPageView = () => {
  console.log(`Logging pageview for ${window.location.pathname}`);
  ReactGA.set({ page: window?.location.pathname });
  ReactGA.pageview(window?.location.pathname);
};
export const logEvent = (category = '', action = '') => {
  if (category && action) {
    ReactGA.event({ category, action });
  }
};
export const logException = (description = '', fatal = false) => {
  if (description) {
    ReactGA.exception({ description, fatal });
  }
};

export const analytics = Analytics({
  app: 'super-grid-9k',
  plugins: [googleAnalytics({ trackingId: 'UA-175519886-1' })],
});
