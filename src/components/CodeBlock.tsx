import Highlight, {
  defaultProps,
  Language,
  PrismTheme,
  RenderProps,
} from "prism-react-renderer";
import React, { FC } from "react";
import Clipboard from "react-clipboard.js";
import { Box, BoxProps } from "rebass/styled-components";
import styled, { css } from "styled-components/macro";
import syntaxTheme from "../lib/syntaxTheme";
export interface CodeBlockProps extends BoxProps {
  code: string;
  language: string;
  theme?: PrismTheme;
}

const CodeBlock: FC<CodeBlockProps> = ({
  code,
  language,
  theme,
  ...boxProps
}) => {
  return (
    <Highlight
      {...defaultProps}
      code={code}
      language={language as Language}
      theme={theme}
    >
      {(renderProps) => (
        <CodeBody {...renderProps} code={code} boxProps={boxProps} />
      )}
    </Highlight>
  );
};
interface CodeBodyProps extends RenderProps {
  code: string;
  boxProps: BoxProps;
}

const CodeBody: FC<CodeBodyProps> = ({
  className,
  style,
  tokens,
  getLineProps,
  getTokenProps,
  code,
  boxProps,
}) => {
  const [showCopy, setShowCopy] = React.useState(false);
  const [copyText, setCopyText] = React.useState("copy");

  const mouseHandler: React.MouseEventHandler<HTMLDivElement> = (event) => {
    setShowCopy((prev) => !prev);
  };

  const handleCopySuccess = (event: ClipboardJS.Event) => {
    setCopyText("Copied!");
  };

  return (
    <CodeContainer
      onMouseEnter={mouseHandler}
      onMouseLeave={mouseHandler}
      showCopy={showCopy}
      {...boxProps}
    >
      <Clipboard
        data-clipboard-text={code}
        component={CopyButton}
        onSuccess={handleCopySuccess}
      >
        {copyText}
      </Clipboard>
      <Box as="pre" className={className} style={style} {...boxProps}>
        <code>
          {tokens.map((line, i) => (
            <div {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </code>
      </Box>
    </CodeContainer>
  );
};

const CopyButton = styled.button`
  position: absolute;
  top: 4px;
  right: 4px;
  display: inline-block;
  align-items: flex-start;
  margin: 0em;
  padding: 0.4rem 0.5rem;
  color: ${({ theme }) => theme.colors.light};
  font: 400 13.3333px "Arial", sans-serif;
  letter-spacing: normal;
  text-align: center;
  text-transform: none;
  text-indent: 0px;
  text-shadow: none;
  word-spacing: normal;
  background: rgba(0, 0, 0, 0.3);
  border: none;
  border-color: ${({ theme }) => theme.colors.code};
  border-style: solid;
  border-width: 2px;
  text-rendering: auto;
  border-radius: 8px;
  border-image: initial;
  outline: none;
  visibility: hidden;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.2s ease-in-out, visibility 0.2s ease-in-out,
    bottom 0.2s ease-in-out;
  appearance: button;
`;
const CodeContainer = styled.div<{ showCopy: boolean }>`
  position: relative;
  height: inherit;
  ${({ showCopy }) =>
    showCopy &&
    css`
      ${CopyButton} {
        visibility: visible;
        opacity: 1;
      }
    `};
`;

CodeBlock.defaultProps = {
  theme: syntaxTheme,
  className: "CodeBlock",
};

export default CodeBlock;
