import Link from 'next/link';
import React from 'react';
const Example = (props) => {
  return (
    <div>
      <p>This page is static because it does not fetch any data or include the authed user info.</p>
      <Link href={'/'}>
        <a>Home</a>
      </Link>
    </div>
  );
};

export default Example;
