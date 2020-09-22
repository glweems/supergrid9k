import { motion } from 'framer-motion';
import React from 'react';
import { useRecoilState } from 'recoil';
import { ui } from '../store/ui';
import Box, { BoxProps } from './Box';

const Toolbar: React.FC<BoxProps> = ({ children, ...boxProps }) => {
  const [{ toolbarHeight }] = useRecoilState(ui);
  return (
    <Box as={motion.section} height={toolbarHeight} {...boxProps}>
      {children}
    </Box>
  );
};

export default Toolbar;
