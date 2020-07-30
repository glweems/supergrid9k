import React, { FC } from "react";
import { useRecoilValue } from "recoil";
import { toType } from "../lib/toType";
import { codeBlock } from "../store/code";
import Box from "../ui/Box";
import CodeViewerControls from "./CodeViewerControls";
import PrismCode, { PrismCodeProps } from "./PrismCode";

const CodeSnippets: FC = ({ children }) => {
  const state = useRecoilValue(codeBlock);
  if (toType(state) === "array")
    return (
      <Box display="flex">
        {(state as PrismCodeProps[]).map((snip) => (
          <PrismCode {...snip} />
        ))}
      </Box>
    );

  return (
    <PrismCode
      language={(state as PrismCodeProps).language}
      code={(state as PrismCodeProps).code}
    />
  );
};

const CodeViewer = () => {
  return (
    <Box display="flex" bg="dark">
      <CodeViewerControls />
      <CodeSnippets />
    </Box>
  );
};

export default CodeViewer;
