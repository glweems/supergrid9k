import syntaxTheme from '@/lib/syntaxTheme';
import Box, { BoxProps } from '@/ui/Box';
import Button from '@/ui/Button';
import { motion } from 'framer-motion';
import Highlight, {
  defaultProps,
  Language,
  PrismTheme,
  RenderProps,
} from 'prism-react-renderer';
import React, { FC } from 'react';
import Clipboard from 'react-clipboard.js';
import Id from 'react-id-generator';
import styled from 'styled-components/macro';
import If from './If';
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
        <CodeBody
          language={language}
          {...renderProps}
          code={code}
          boxProps={boxProps}
        />
      )}
    </Highlight>
  );
};
interface CodeBodyProps extends RenderProps {
  code: string;
  boxProps: BoxProps;
  language: string;
}

const CodeBody: FC<CodeBodyProps> = ({
  className,
  language,
  style,
  tokens,
  getLineProps,
  getTokenProps,
  code,
  boxProps,
}) => {
  const [showCopy, setShowCopy] = React.useState(false);
  const [copyText, setCopyText] = React.useState('Copy');

  const mouseHandler: React.MouseEventHandler<HTMLDivElement> = () => {
    setShowCopy((prev) => !prev);
  };

  const handleCopySuccess = () => {
    setCopyText('Copied!');
  };

  return (
    <CodeContainer
      onMouseEnter={mouseHandler}
      onMouseLeave={mouseHandler}
      {...boxProps}
    >
      <If
        isTrue={showCopy}
        motionProps={{
          initial: { opacity: 0, x: -5 },
          animate: { opacity: 1, x: -5 },
          exit: { opacity: 0, x: 30 },
        }}
      >
        <Clipboard
          data-clipboard-text={code}
          component={CopyButton}
          onSuccess={handleCopySuccess}
        >
          {copyText}
        </Clipboard>
      </If>
      <Box as={motion.pre} className={className} style={style} {...boxProps}>
        <code>
          {tokens?.map((line, i) => (
            <div
              key={`token-${i}-${language}`}
              {...getLineProps({ line, key: i })}
            >
              {line.map((token, key) => (
                <span key={Id('span')} {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </code>
      </Box>
    </CodeContainer>
  );
};

const CopyButton = styled(Button)`
  position: absolute;
  top: 4px;
  right: 4px;
  display: inline-block;
  align-items: flex-start;
  margin: 0em;
  padding: 0.4rem 0.5rem;
  color: var(--color-light);
  font: 400 13.3333px 'Arial', sans-serif;
  letter-spacing: normal;
  text-align: center;
  text-transform: none;
  text-indent: 0px;
  text-shadow: none;
  word-spacing: normal;
  background: rgba(0, 0, 0, 0.3);
  border: none;
  border-color: var(--color-code);
  border-style: solid;
  border-width: 2px;
  text-rendering: auto;
  border-radius: var(--space-2);
  border-image: initial;
  outline: none;
  cursor: pointer;
  transition: opacity 0.2s ease-in-out, visibility 0.2s ease-in-out,
    bottom 0.2s ease-in-out;
  appearance: button;
`;
const CodeContainer = styled.div<{ showCopy: boolean }>`
  position: relative;
  height: inherit;
`;

CodeBlock.defaultProps = {
  theme: syntaxTheme,
  className: 'CodeBlock',
};

export default CodeBlock;
