import { Box, BoxProps } from '@primer/components';
import { useFormikContext } from 'formik';
import { transparentize } from 'polished';
import React, { useState } from 'react';
import styled from 'styled-components';
import { variant } from 'styled-system';
import { GridItemProps } from './GridAreas';
import { GridState } from './GridState';

export function GridItem(area: GridItemProps) {
  const formik = useFormikContext<GridState>();
  const { selected } = formik.values;
  const [isSelected, setIsSelected] = useState(false);
  const [variant, setVariant] = useState<GridItemDivVariant>('default');
  const [boxProps, setBoxProps] = useState<BoxProps>({
    bg: 'blue.5',
  });
  const handleMouseEnter = () => {
    if (selected && variant === 'default') setVariant('target');
  };
  const handleMouseLeave = () => {
    if (variant === 'target') setVariant('default');
  };
  const handleClick = () => {
    if (variant === 'default' && !selected) {
      setVariant('selected');
      formik.setFieldValue('selected', area);
    }

    // throttle(() => formik.setFieldValue(`areas.temp`, area), 200);
  };

  return (
    <GridItemDiv
      variant={variant}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {area.row}
      <br />
      {area.column}
    </GridItemDiv>
  );
}
export type GridItemDivVariant = 'default' | 'hover' | 'selected' | 'target';

export const GridItemDiv = styled.div<{ variant: GridItemDivVariant }>`
  border-style: solid;
  border-width: 2px;
  ${(props) =>
    variant<unknown, GridItemDivVariant>({
      key: 'variant',
      variants: {
        default: {
          borderColor: 'blue.4',
          bg: transparentize(0.65, props.theme.colors.blue[5]),
        },
        hover: {
          bg: 'blue.7',
        },
        selected: { bg: 'yellow.5' },
        target: { bg: 'red.5' },
      },
    })};
`;
