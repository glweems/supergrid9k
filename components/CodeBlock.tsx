import { Box, BoxProps } from '@primer/components';
import Highlight, {
  defaultProps,
  Language,
  PrismTheme,
  RenderProps,
} from 'prism-react-renderer';
import React, { FC, Fragment } from 'react';
import Clipboard from 'react-clipboard.js';
import styled, { css } from 'styled-components';
import syntaxTheme from '../lib/syntaxTheme';

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
        <Fragment>
          <span style={{ color: syntaxTheme.plain.color, marginLeft: '1rem' }}>
            {language}
          </span>
          <CodeBody
            {...renderProps}
            language={language}
            code={code}
            boxProps={boxProps}
          />
        </Fragment>
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
            <div key={line.toString()} {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span key={i} {...getTokenProps({ token, key })} />
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
  color: ${syntaxTheme.plain.color};
  font: 400 13.3333px 'Arial', sans-serif;
  letter-spacing: normal;
  text-align: center;
  text-transform: none;
  text-indent: 0px;
  text-shadow: none;
  word-spacing: normal;
  background: rgba(0, 0, 0, 0.3);
  border: none;
  border-color: ${syntaxTheme.plain.backgroundColor};
  border-style: solid;
  border-width: 2px;
  text-rendering: auto;
  border-radius: ${(props) => props.theme.space[2]};
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
  className: 'CodeBlock',
};

export default CodeBlock;
