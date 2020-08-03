import React, { FC } from "react";
import { useRecoilValue } from "recoil";
import { toType } from "../lib/toType";
import { codeBlock } from "../store/code";
import CodeBlock, { CodeBlockProps } from "./CodeBlock";

const CodeViewer: FC = () => {
  const state = useRecoilValue(codeBlock);

  if (state && toType(state) === "array")
    return (
      <React.Fragment>
        {(state as CodeBlockProps[]).map((snip) => (
          <CodeBlock key={snip.language} {...snip} />
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
