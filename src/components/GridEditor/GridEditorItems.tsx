import React from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components/macro';
import { gridEditorAreas, gridCss } from '../../store/grid';
import Box, { BoxProps } from '../../ui/Box';
import GridEditorItem from './GridEditorItem';
import Id from 'react-id-generator';

export type GridItemsProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & BoxProps;

const GridItems: React.FC<GridItemsProps> = () => {
  const gridProps = useRecoilValue(gridCss);
  const items = useRecoilValue(gridEditorAreas);

  return (
    <Box as="section" height="100%" className="GridEditorItems">
      <GridRender {...gridProps} padding={3} className="grid">
        {items?.map((item, index) => (
          <GridEditorItem key={Id('item')} {...item} />
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
