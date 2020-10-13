import { Box, BoxProps } from '@primer/components';
import { flatten } from 'css-grid-template-parser';
import { useFormikContext } from 'formik';
import { transparentize } from 'polished';
import React from 'react';
import styled from 'styled-components/macro';
import { variant } from 'styled-system';
import { GridState } from '../../css-grid-template-parser/GridState';
import theme from '../../lib/theme';
import { GridItem } from './GridItem';

type GridAreasProps = BoxProps;

const GridAreas: React.FC<GridAreasProps> = ({ ...boxProps }) => {
  const formik = useFormikContext<GridState>();
  const { gridTemplateRows, gridTemplateColumns } = formik.values;
  const areas = formik.values.items();

  const styleObj = {
    gridTemplateRows: flatten(gridTemplateRows),
    gridTemplateColumns: flatten(gridTemplateColumns),
    gap: flatten(formik.values.gridGap),
    gridTemplateAreas: formik.values.gridTemplateAreas(),
  };
  return (
    <GridProperties {...boxProps} style={styleObj}>
      {areas.map((area, index) => (
        <GridItem key={`area-${index}`} {...area} index={index} />
      ))}
    </GridProperties>
  );
};

const GridProperties = styled(Box)`
  display: grid;
  grid-area: grid;
  height: 100%;
  padding: var(--space-4);
`;

export type GridItemDivVariant = 'default' | 'hover' | 'selected';
export const GridItemDiv = styled.div<{ variant: GridItemDivVariant }>`
  border-style: dashed;
  border-width: 2px;

  ${variant<unknown, GridItemDivVariant>({
    key: 'variant',
    variants: {
      default: {
        borderColor: 'var(--color-primary)',
      },
      hover: {
        borderColor: 'var(--color-purple)',
        backgroundColor: transparentize(0.75, theme.colors.purple),
      },
      selected: { borderColor: 'var(--color-yellow)' },
    },
  })}
`;

export default GridAreas;
