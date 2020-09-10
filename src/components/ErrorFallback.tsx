import React from 'react';
import { FallbackProps } from 'react-error-boundary';

export default function ErrorFallback({ error }: FallbackProps) {
  return (
    <React.Fragment>
      <h1>Whoops!</h1>
      <h2>There&apos;s been a problem</h2>
      <pre>
        <code>{JSON.stringify(error, null, 2)}</code>
      </pre>
    </React.Fragment>
  );
}
