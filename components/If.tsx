import { AnimatePresence, HTMLMotionProps, motion } from 'framer-motion';
import React from 'react';
interface IfProps {
  isTrue?: boolean | null;
  fallback?: any;
  motionProps?: HTMLMotionProps<'div'>;
  animated?: boolean;
  children?: React.ReactNode | React.ReactChildren | React.ReactText;
}

const If = ({ children, isTrue, fallback, motionProps, animated }: IfProps) => {
  return animated ? (
    <AnimatePresence>
      {isTrue ? <motion.div {...motionProps}>{children}</motion.div> : fallback}
    </AnimatePresence>
  ) : isTrue ? (
    <React.Fragment>{children}</React.Fragment>
  ) : null;
};

If.defaultProps = {
  fallback: null,
  animated: false,
  motionProps: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0, y: 30, duration: 10 },
  },
};

If.displayName = 'If';
export default If;
