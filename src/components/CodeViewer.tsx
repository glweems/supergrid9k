import React, { FC } from "react";
import { useRecoilValue } from "recoil";
import { toType } from "../lib/toType";
import { codeBlock } from "../store/code";
import CodeBlock, { CodeBlockProps } from "./CodeBlock";

const CodeViewer: FC = () => {
  const state = useRecoilValue(codeBlock);
  if (toType(state) === "array")
    return (
      <React.Fragment>
        {(state as CodeBlockProps[]).map((snip) => (
          <CodeBlock {...snip} />
        ))}
      </React.Fragment>
    );

  return (
    <CodeBlock
      language={(state as CodeBlockProps).language}
      code={(state as CodeBlockProps).code}
    />
  );
};

export default CodeViewer;
