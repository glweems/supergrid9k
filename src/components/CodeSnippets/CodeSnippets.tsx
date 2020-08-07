import React from "react";
import { useRecoilValue } from "recoil";
import { snippets } from "../../store/codeBlock";
import CodeBlock from "../CodeBlock";
import Box from "../../ui/Box";

const CodeSnippets: React.FC = (props) => {
  const state = useRecoilValue(snippets);
  return (
    <Box display="flex">
      <CodeBlock language="css" code={state.css} />
      <CodeBlock language="html" code={state.html} />
    </Box>
  );
};

export default CodeSnippets;
