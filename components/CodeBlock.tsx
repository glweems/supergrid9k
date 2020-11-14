import syntaxTheme from '@lib/syntaxTheme';
import { Box, BoxProps, ButtonOutline, Text } from '@primer/components';
import Highlight, {
  defaultProps,
  Language,
  PrismTheme,
  RenderProps,
} from 'prism-react-renderer';
import React, { FC } from 'react';
import Clipboard from 'react-clipboard.js';
import styled from 'styled-components/macro';
import If from './If';
export interface CodeBlockProps extends BoxProps {
  code: string;
  language: string;
  theme?: PrismTheme;
  comment?: string;
  canCopy?: boolean;
}

const CodeBlock: FC<CodeBlockProps> = ({
  code,
  language,
  theme,
  comment,
  canCopy,
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
          canCopy={canCopy}
          comment={comment}
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
  comment?: string;
  boxProps: BoxProps;
  language: string;
  canCopy?: boolean;
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
  comment,
  canCopy,
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
      <If isTrue={canCopy}>
        <If isTrue={showCopy}>
          <Clipboard
            data-clipboard-text={code}
            component={CopyButton}
            onSuccess={handleCopySuccess}
          >
            {copyText}
          </Clipboard>
        </If>
      </If>

      <Box className={className}>
        <pre style={style}>
          {comment && (
            <Text marginBottom={'5px'} color="grey">
              {'//'}
              {comment}
            </Text>
          )}
          <code>
            {tokens?.map((line, i) => (
              <div
                key={`token-${i}-${language}`}
                {...getLineProps({ line, key: i })}
              >
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </code>
        </pre>
      </Box>
    </CodeContainer>
  );
};

const CopyButton = styled(ButtonOutline)`
  position: absolute;
  top: 4px;
  right: 4px;
  transition: opacity 0.2s ease-in-out, visibility 0.2s ease-in-out,
    bottom 0.2s ease-in-out;
  appearance: button;
  pointer-events: none;
`;
CopyButton.defaultProps = {
  variant: 'small',
};
const CodeContainer = styled.div<{ showCopy: boolean }>`
  position: relative;
  height: inherit;
`;

CodeBlock.defaultProps = {
  theme: syntaxTheme,
  className: 'CodeBlock',
  canCopy: false,
  style: { pointerEvents: 'none' },
};

export default CodeBlock;
