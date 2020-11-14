import { Box, ButtonOutline, Flex } from '@primer/components';
import React from 'react';
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';
import { gridHistoryState, gridState } from './gridState';
import { HistoryIcon } from '@primer/octicons-react';
import { selectedAreasState } from './gridAreasState';
import { newAreaState } from './CreatingArea';
import styled from 'styled-components';
import { templateState } from './TemplateEntry';

const ResetButton = () => {
  const setGridState = useSetRecoilState(gridState);
  const setSelectedArea = useSetRecoilState(selectedAreasState);
  const history = useRecoilValue(gridHistoryState);
  const resetCreatingArea = useResetRecoilState(newAreaState);
  const resetTemplate = useResetRecoilState(templateState);
  const handleClick = (): void => {
    setGridState(history[0]);
    setSelectedArea(null);
    resetCreatingArea();
    resetTemplate();
  };

  return (
    <ResetButtonStyles onClick={handleClick}>
      <Flex alignItems="center" justifyContent="center">
        <HistoryIcon />
        <Box as="span" ml={2}>
          Reset
        </Box>
      </Flex>
    </ResetButtonStyles>
  );
};

const ResetButtonStyles = styled(ButtonOutline)(({ theme: { colors } }) => ({
  borderColor: colors.red[2],
  color: colors.red[5],
  width: '100%',
  ':hover': { backgroundColor: colors.red[5] },
}));

export default ResetButton;
