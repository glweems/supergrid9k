import CodeBlock from '@components/CodeBlock';
import theme from '@lib/theme';
import { AnimatePresence, motion } from 'framer-motion';
import React, { Fragment, memo, useCallback, useState } from 'react';
import { Resizable } from 'react-resizable';
import { useRecoilState, useRecoilValue } from 'recoil';
import cssState from './cssState';
import { optionsState } from './GridActions';
import { Handle } from './Handle';
import CodePenButton from '@components/CodePenButton';

export const CodeSection = ({ className }) => {
  const [{ width: initialWidth, useCssRepeatFn }, setOptions] = useRecoilState(
    optionsState
  );
  const code = useRecoilValue(cssState);
  const [width, setWidth] = useState(initialWidth);
  const [resizing, setResizing] = useState(false);
  const handleResizeStart = useCallback(() => setResizing(true), []);
  return (
    <motion.section
      style={{ width: `${width}px`, position: 'relative' }}
      className={className}
    >
      <Resizable
        height={0}
        width={width}
        resizeHandles={['w']}
        handle={(h) => <Handle className={`handle-${h}`} resizing={resizing} />}
        onResizeStart={handleResizeStart}
        onResizeStop={() => setResizing(false)}
        onResize={(_, { size }) => {
          setWidth(Math.round(size.width));
        }}
      >
        <AnimatePresence>
          <motion.div
            style={{ padding: theme.space[2] }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Fragment>
              <label>
                <input
                  type="checkbox"
                  defaultChecked={useCssRepeatFn}
                  onClick={() =>
                    setOptions((prev) => ({
                      ...prev,
                      useCssRepeatFn: !prev.useCssRepeatFn,
                    }))
                  }
                />
                use css repeat
              </label>
              {code?.css && <CodeBlock language="css" code={code.css} />}
              {code?.html && <CodeBlock language="html" code={code.html} />}
            </Fragment>
            <CodePenButton code={code} />
          </motion.div>
        </AnimatePresence>
      </Resizable>
    </motion.section>
  );
};

export default memo(CodeSection);
