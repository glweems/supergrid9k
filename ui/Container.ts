import Box from './Box';

import styled from 'styled-components';

const Container = styled(Box)``;

Container.defaultProps = { width: ['100%', '45rem', `66rem`], margin: 'auto' };
export default Container;
