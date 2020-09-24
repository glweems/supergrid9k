import { GridAreaState, gridCss, gridEditorAreas } from '@/store/grid';
import Box, { BoxProps } from '@/ui/Box';
import { AnimateSharedLayout, motion } from 'framer-motion';
import React from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components/macro';
import GridEditorItem from './GridEditorItem';

type GridItemsProps = BoxProps & {
  items?: GridAreaState[];
};

const GridItems: React.FC<GridItemsProps> = () => {
  const gridProps = useRecoilValue(gridCss);
  const items = useRecoilValue(gridEditorAreas);

  // const [editState, setEditState] = React.useState<string>(undefined);

  return (
    <AnimateSharedLayout type="crossfade">
      <GridRender {...gridProps} layout padding={3} className="grid">
        {items?.map((item, _index) => (
          <GridEditorItem key={item.id} {...item} />
        ))}
      </GridRender>
    </AnimateSharedLayout>
  );
};

const GridRender = motion.custom(styled(Box)`
  display: grid;
  height: 100%;
`);

GridItems.defaultProps = { className: 'GridItems' };

export default GridItems;
