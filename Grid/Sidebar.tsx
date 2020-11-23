import theme from '@lib/theme';
import { motion } from 'framer-motion';
import React, { FC, memo, useState } from 'react';
import { Resizable } from 'react-resizable';
import { useLocalStorage } from 'react-use';
import GridControls from './GridControls';
import GridGapControls from './GridGapControls';
import { Handle } from './Handle';
import ResetButton from './ResetButton';

interface SidebarProps {
  isMobile: boolean;
  className: string;
}

const Sidebar: FC<SidebarProps> = ({ className }) => {
  const [width, setWidth] = useLocalStorage('sidebarWidth', theme.sidebarWidth);
  const [resizing, setResizing] = useState(false);
  return (
    <motion.section
      style={{
        width: `${width}px`,
        position: 'relative',
        overflowX: 'hidden',
        overflowY: 'auto',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
      className={className}
    >
      <Resizable
        height={0}
        width={width}
        resizeHandles={['e']}
        handle={(h) => <Handle className={`handle-${h}`} resizing={resizing} />}
        onResizeStart={() => setResizing(true)}
        onResizeStop={() => setResizing(false)}
        onResize={(_, { size }) => {
          setWidth(Math.round(size.width));
        }}
      >
        <div style={{ padding: theme.space[2] }}>
          <GridControls id="rows" />
          <GridControls id="columns" />
          <GridGapControls />
          <ResetButton />
        </div>
      </Resizable>
    </motion.section>
  );
};
export default memo(Sidebar);
