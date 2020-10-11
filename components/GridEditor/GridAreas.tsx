import {
  BorderBox,
  Box,
  BoxProps,
  Button,
  ButtonGroup,
  FormGroup,
  TextInput,
} from '@primer/components';
import {
  Entry,
  flatten,
  rect,
  template,
  track,
} from 'css-grid-template-parser';
import { useFormikContext } from 'formik';
import { values } from 'lodash';
import { transparentize } from 'polished';
import React from 'react';
import styled from 'styled-components/macro';
import { variant } from 'styled-system';
import theme from '../../lib/theme';
import If from '../If';
import { GridItem } from './GridItem';
import { GridState } from './GridState';

type GridAreasProps = BoxProps;

const GridAreas: React.FC<GridAreasProps> = ({ ...boxProps }) => {
  const formik = useFormikContext<GridState>();
  const { gridTemplateRows, gridTemplateColumns, temp } = formik.values;
  const areas = formik.values.items();

  const styleObj = {
    gridTemplateRows: flatten(gridTemplateRows),
    gridTemplateColumns: flatten(gridTemplateColumns),
    gap: flatten(formik.values.gridGap),
    gridTemplateAreas: formik.values.gridTemplateAreas(),
  };
  return (
    <GridProperties {...boxProps} style={styleObj}>
      {areas.map((area, i) => (
        <GridItem key={`area-${i}`} {...area} />
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

export type GridItemProps = ReturnType<GridState['items']>[number];

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
