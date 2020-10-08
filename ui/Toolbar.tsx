import { motion } from 'framer-motion';
import React from 'react';
import { useTheme } from 'styled-components/macro';
import Box, { BoxProps } from './Box';

const Toolbar: React.FC<BoxProps> = ({ children, ...boxProps }) => {
  const { toolbarHeight } = useTheme();
  return (
    <Box as={motion.section} height={toolbarHeight} {...boxProps}>
      {children}
    </Box>
  );
};

export default Toolbar;
