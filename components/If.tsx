import { AnimatePresence, HTMLMotionProps, motion } from 'framer-motion';
import React from 'react';
interface IfProps {
  isTrue?: boolean | null;
  fallback?: any;
  motionProps?: HTMLMotionProps<'div'>;
}

const If: React.FC<IfProps> = ({ children, isTrue, fallback, motionProps }) => {
  return (
    <AnimatePresence>
      {isTrue ? <motion.div {...motionProps}>{children}</motion.div> : fallback}
    </AnimatePresence>
  );
};

If.defaultProps = {
  fallback: null,
  motionProps: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0, y: 30 },
  },
};

export default If;
