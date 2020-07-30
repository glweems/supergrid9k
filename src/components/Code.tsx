import Prism from "prismjs";
import React, { FC, useEffect } from "react";
import "../prism.css";
export type PrismSyntaxLanguage = "css" | "html" | "javascript" | "jsx" | "js";

export interface CodeProps {
  lang: PrismSyntaxLanguage;
}
const Code: FC<CodeProps> = ({ children, lang }) => {
  useEffect(() => {
    Prism.highlightAll();
  }, []);

  return (
    <pre>
      <code className={`language-${lang}`}>{children}</code>
    </pre>
  );
};

export default Code;
