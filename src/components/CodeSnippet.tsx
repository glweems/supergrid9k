import React from "react";
import { useRecoilValue } from "recoil";
import { CodeSnippetLanguage, snippets } from "../state";
import CodeBlock from "./CodeBlock";

export interface CodeSnippetProps {
  language: CodeSnippetLanguage;
}

const CodeSnippet: React.FC<CodeSnippetProps> = ({ language }) => {
  const state = useRecoilValue(snippets);
  return <CodeBlock language={language} code={state[language]} />;
};

export default CodeSnippet;
