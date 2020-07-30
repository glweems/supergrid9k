import React, { FC } from "react";
import { useRecoilValue } from "recoil";
import { toType } from "../lib/toType";
import { codeBlock } from "../store/code";
import Box from "../ui/Box";
import CodeBlock, { CodeBlockProps } from "./CodeBlock";

const CodeViewer: FC = ({ children }) => {
  const state = useRecoilValue(codeBlock);
  if (toType(state) === "array")
    return (
      <Box display="flex">
        {(state as CodeBlockProps[]).map((snip) => (
          <CodeBlock {...snip} />
        ))}
      </Box>
    );

  return (
    <CodeBlock
      language={(state as CodeBlockProps).language}
      code={(state as CodeBlockProps).code}
    />
  );
};

export default CodeViewer;
