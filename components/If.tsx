import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
interface IfProps {
  isTrue?: boolean | null;
}

const If: React.FC<IfProps> = ({ isTrue, children }) => {
  return (
    <AnimatePresence>
      {isTrue && (
        <motion.div key="modal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default If;
