import { GridArea, gridCss, gridEditorAreas } from '@/store/grid';
import { useGridEditorUi } from '@/store/ui';
import Box, { BoxProps } from '@/ui/Box';
import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion';
import React from 'react';
import { Card } from 'rebass/styled-components';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components/macro';
import GridEditorItem from './GridEditorItem';

interface GridItemsProps extends BoxProps {
  items?: GridArea[];
  className?: string;
}

const GridItems: React.FC<GridItemsProps> = () => {
  const gridProps = useRecoilValue(gridCss);
  const items = useRecoilValue(gridEditorAreas);
  const {
    activeEditingId,
    setGridEditorUiState,
    isGridItemOpen,
  } = useGridEditorUi();

  return (
    <React.Fragment>
      <Box as="section" height="100%" className="GridEditorItems">
        <GridRender {...gridProps} padding={3} className="grid">
          <AnimateSharedLayout type="crossfade">
            {items.map((item, index) => (
              <GridEditorItem key={item.id} {...item} number={index} />
            ))}
          </AnimateSharedLayout>
        </GridRender>
      </Box>
      <AnimatePresence>
        {activeEditingId && isGridItemOpen && (
          <Modal
            layoutId={activeEditingId}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setGridEditorUiState(null)}
          >
            <Card>
              <motion.h1>Heloooooooo</motion.h1>
              <motion.h5>{activeEditingId}</motion.h5>
            </Card>
          </Modal>
        )}
      </AnimatePresence>
    </React.Fragment>
  );
};

const Modal = motion.custom(styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  place-items: center;
  place-content: center;
  width: 100vw;
  height: 100vh;
  backdrop-filter: blur(5px);
`);

const GridRender = styled(Box)`
  display: grid;
  height: 100%;
`;

GridItems.defaultProps = { className: 'GridItems' };

export default GridItems;
