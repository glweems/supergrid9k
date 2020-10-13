import { Box, BoxProps } from '@primer/components';
import { useFormikContext } from 'formik';
import React, { useState } from 'react';
import { GridState, Track, areaFromGridItems } from 'css-grid-template-parser';
import { GridItemInner } from './GridItemInner';

export type GridItemProps = {
  name: string;
  gridArea: string;
  row: Track;
  column: Track;
  index: number;
};

export function GridItem(area: GridItemProps) {
  const formik = useFormikContext<GridState>();

  const { setFieldValue, values } = formik;
  const { selected } = values;
  const [boxProps, setboxProps] = useState<BoxProps>({ bg: 'blue.5' });
  // const [variant, setVariant] = useState<GridItemDivVariant>('default');

  const handleClick = () => {
    if (values?.editor?.gridArea) return;

    if (!selected) {
      setboxProps({ bg: 'yellow.5' });
      formik.setFieldValue('selected', area);
    }

    if (selected) {
      // If clicking on edit anchor set editing false
      if (area.gridArea === selected?.gridArea) {
        setFieldValue('selected', null);
        setboxProps({ bg: 'blue.5' });
      }

      const newAreaRaw = areaFromGridItems(selected, area);
      console.log('newAreaRaw: ', newAreaRaw);

      setFieldValue('areas.temp', newAreaRaw);
      setFieldValue('selected', null);
      setFieldValue('editor.gridArea', 'temp');
    }
  };

  const handleMouseEnter = () => {
    if (selected && area.gridArea !== selected?.gridArea) {
      setboxProps({ bg: 'yellow.5' });
      // setResizing(true);

      // formik.setFieldValue('areas.temp', );
    }
  };
  const handleMouseLeave = () => {
    if (area.gridArea !== selected?.gridArea) setboxProps({ bg: 'blue.5' });
  };

  return (
    <Box
      style={{ gridArea: area.gridArea }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      bg={boxProps.bg}
      padding={2}
    >
      <GridItemInner {...area} />
    </Box>
  );
}
