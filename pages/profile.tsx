import React from 'react';
import { NextComponentType } from 'next';
import CodeBlock from '../components/CodeBlock';
import withIdentity from '../lib/passport/withIdentity';

const ProfilePage: NextComponentType<React.FC> = (props) => {
  return (
    <div>
      <CodeBlock language="json" code={JSON.stringify(props, null, 2)} />
    </div>
  );
};

ProfilePage.getInitialProps = async (context) => {
  console.log('context: ', context);
  return { hi: '' };
};

export default withIdentity(ProfilePage);
