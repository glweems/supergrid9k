import React from "react";
import { useRecoilValue } from "recoil";
import { codeBlocks } from "../store/code";

interface Props {}

const CodeViewer = (props: Props) => {
  const code = useRecoilValue(codeBlocks);
  return (
    <pre>
      <code>{code.vanilla}</code>
    </pre>
  );
};

export default CodeViewer;
