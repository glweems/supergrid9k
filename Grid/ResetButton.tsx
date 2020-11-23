import { Box, Flex } from '@primer/components';
import { HistoryIcon } from '@primer/octicons-react';
import React from 'react';
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';
import { selectedAreasState } from './gridAreasState';
import { gridHistoryState, gridState } from './gridState';
import { templateState } from './TemplateEntry';

const ResetButton = () => {
  const setGridState = useSetRecoilState(gridState);
  const setSelectedArea = useSetRecoilState(selectedAreasState);
  const history = useRecoilValue(gridHistoryState);
  const resetTemplate = useResetRecoilState(templateState);
  const handleClick = (): void => {
    setGridState(history[0]);
    setSelectedArea(null);
    resetTemplate();
  };

  return (
    <button
      className="fullwidth btn-red"
      onClick={handleClick}
      style={{ position: 'sticky', bottom: 0, left: 0 }}
    >
      <Flex alignItems="center" justifyContent="center">
        <HistoryIcon />
        <Box as="span" ml={2}>
          Reset
        </Box>
      </Flex>
    </button>
  );
};

export default ResetButton;
