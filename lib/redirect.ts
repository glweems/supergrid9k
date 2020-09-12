import Router from 'next/router';
import { NextPageContext } from 'next';

const redirect = (context: NextPageContext, target: string) => {
  try {
    if (context.res) {
      // server
      // 303: "See other"
      context?.res?.writeHead(303, { Location: target });
      context?.res?.end();
    } else {
      // In the browser, we just pretend like this never even happened ;)
      Router.replace(target);
    }
  } catch (err) {
    console.error(err);
  }
};

export default redirect;
