import React from "react";
import { FallbackProps } from "react-error-boundary";

interface Props {}

export default function ErrorFallback({ error }: FallbackProps) {
  return (
    <React.Fragment>
      <h1>Whoops!</h1>
      <h2>There's been a problem</h2>
      <pre>
        <code>{JSON.stringify(error, null, 2)}</code>
      </pre>
    </React.Fragment>
  );
}
