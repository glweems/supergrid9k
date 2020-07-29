import React, { FC, Fragment } from "react";
import { useRecoilValue } from "recoil";
import { toType } from "../lib/toType";
import { CodeBlock, codeBlock } from "../store/code";
import Code from "./Code";

interface CodeViewerProps {}

const CodeViewer: FC<CodeViewerProps> = ({ children }) => {
  const state = useRecoilValue(codeBlock);
  if (toType(state) === "array")
    return (
      <Fragment>
        {(state as CodeBlock[]).map(({ lang, code }) => (
          <Code lang={lang}>{code}</Code>
        ))}
      </Fragment>
    );

  return (
    <Code lang={(state as CodeBlock).lang}>{(state as CodeBlock).code}</Code>
  );
};

export default CodeViewer;
