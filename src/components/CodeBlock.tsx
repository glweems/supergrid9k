import Highlight, {
  defaultProps,
  Language,
  PrismTheme,
} from "prism-react-renderer";
import React, { FC } from "react";
import nightOwl from "prism-react-renderer/themes/oceanicNext";
import Box from "../ui/Box";

export interface CodeBlockProps {
  code: string;
  language: string;
  theme?: PrismTheme;
}

const CodeBlock: FC<CodeBlockProps> = ({ code, language, theme }) => {
  return (
    <Highlight
      {...defaultProps}
      code={code}
      language={language as Language}
      theme={theme}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <Box
          as="pre"
          className={className}
          style={style}
          padding={2}
          margin={1}
          borderRadius={3}
        >
          <code className={className}>
            {tokens.map((line, i) => (
              <div {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <span {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </code>
        </Box>
      )}
    </Highlight>
  );
};

CodeBlock.defaultProps = { theme: nightOwl };

export default CodeBlock;
