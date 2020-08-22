import React from "react";
import { useRecoilValue } from "recoil";
import { snippets } from "../state";
import CodeBlock from "./CodeBlock";

const CodeViewer: React.FC = () => {
  const { css, html } = useRecoilValue(snippets);
  return (
    <React.Fragment>
      <CodeBlock language="css" code={css} />
      <CodeBlock language="html" code={html} />
    </React.Fragment>
  );
};

export default CodeViewer;
