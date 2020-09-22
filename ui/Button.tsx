import { motion } from 'framer-motion';
import { Button as RBButton } from 'rebass/styled-components';

const Button = motion.custom(RBButton);
Button.defaultProps = { whileHover: { scale: 1.1 }, whileTap: { scale: 0.9 } };
Button.displayName = 'Button';
export default Button;
