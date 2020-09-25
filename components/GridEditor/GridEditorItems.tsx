import {
  GridAreaState,
  GridCssObj,
  GridState,
  makeGridAreas,
  makeGridCss,
} from '@/store/grid';
import Box from '@/ui/Box';
import { AnimateSharedLayout, motion } from 'framer-motion';
import React from 'react';
import styled from 'styled-components/macro';
import useSWR from 'swr';
import GridEditorItem from './GridEditorItem';

type GridItemsProps = {
  endpoint?: string;
};

const GridItems: React.FC<GridItemsProps> = ({ endpoint }) => {
  const { data, error, mutate } = useSWR<GridState>('/api/grid/template', {
    refreshInterval: 0,
  });
  const gridItems = makeGridAreas(data);
  const gridCss = makeGridCss(data);
  // const items = useRecoilValue(gridEditorAreas);

  // const [editState, setEditState] = React.useState<string>(undefined);

  return (
    <AnimateSharedLayout>
      <GridRender {...gridCss} layout padding={3} className="grid">
        {gridItems?.map((item, _index) => (
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

export default GridItems;
