import { GridAreaState } from '@store/grid';
import { motion } from 'framer-motion';
import React from 'react';
import Box from '../../ui/Box';
import Button from '../../ui/Button';

const GridEditorItem: React.FC<GridAreaState> = () => {
  return (
    <Box as={motion.div} layout animate={false} bg="primary" width="100%">
      <Button>edit</Button>
    </Box>
  );
};

export default GridEditorItem;
