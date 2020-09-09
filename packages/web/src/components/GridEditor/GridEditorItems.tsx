import React from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components/macro';
import { gridAreas, gridCss } from '../../store/grid';
import Box, { BoxProps } from '../../ui/Box';
import GridEditorItem from './GridEditorItem';

export type GridItemsProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & BoxProps;

const GridItems: React.FC<GridItemsProps> = () => {
  const gridProps = useRecoilValue(gridCss);
  const items = useRecoilValue(gridAreas);

  return (
    <Box as="section" height="100%" className="GridEditorItems">
      <GridRender {...gridProps} padding={3} className="grid">
        {items?.map(({ id, number }) => (
          <GridEditorItem key={id} name={number} />
        ))}
      </GridRender>
    </Box>
  );
};

const GridRender = styled(Box)`
  display: grid;
  height: 100%;
`;

GridItems.defaultProps = { className: 'GridItems' };

export default GridItems;
