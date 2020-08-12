import React from "react";
import { useRecoilValue } from "recoil";
import { snippets } from "../state";
import CodeBlock from "./CodeBlock";

const CodeViewer: React.FC = () => {
  const { css, html } = useRecoilValue(snippets);
  return (
    <React.Fragment>
      <CodeBlock height="100%" width="100%" language="css" code={css} />
      <CodeBlock height="100%" language="html" code={html} />
    </React.Fragment>
  );
};

export default CodeViewer;
