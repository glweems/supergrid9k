import { Box, BoxProps } from '@primer/components';
import { Entry, flatten } from 'css-grid-template-parser';
import { useFormikContext } from 'formik';
import { transparentize } from 'polished';
import React from 'react';
import styled from 'styled-components/macro';
import { variant } from 'styled-system';
import theme from '../../lib/theme';
import createGridAreasArray, { CreateGridAreasArray } from './createGridItems';
import { GridState } from './GridState';

type GridAreasProps = BoxProps;

const GridAreas: React.FC<GridAreasProps> = ({ ...boxProps }) => {
  const { values } = useFormikContext<GridState>();

  const areas = values.items();

  const styleObj = {
    gridTemplateRows: flatten(values.gridTemplateRows),
    gridTemplateColumns: flatten(values.gridTemplateColumns),
    gap: flatten(values.gridGap),
  };

  return (
    <GridProperties {...boxProps} style={styleObj}>
      {areas.map((area) => (
        <GridItem key={area.id} {...area} />
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

export type GridItemProps = {
  id: string;
  row: Entry;
  column: Entry;
  rowStart: number;
  columnStart: number;
};

export function GridItem({ id, ...area }: GridItemProps) {
  const formik = useFormikContext<GridState>();
  const [variant, setVariant] = React.useState<GridItemDivVariant>('default');

  const handleMouseEnter = () => {
    switch (variant) {
      case 'default':
        setVariant('hover');
        break;

      default:
        break;
    }
  };
  const handleMouseLeave = () => {
    switch (variant) {
      case 'hover':
        setVariant('default');
        break;

      default:
        // setVariant('default');
        break;
    }
  };
  const handleClick = () => {
    switch (variant) {
      case 'hover':
        setVariant('default');
        switch (formik.values.selected) {
          case id:
            // formik.setFieldValue('selected', null);
            formik.setFieldValue('areas', {
              ...formik.values.areas,
              temp: `${formik.values.selected}.${area.rowStart + 1}.${
                area.columnStart + 1
              }`,
            });
            break;

          default:
            formik.setFieldValue('selected', id);
            break;
        }
        break;

      default:
        setVariant('selected');
    }
  };

  return (
    <GridItemDiv
      key={id}
      variant={variant}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      // gridRow={area.rowStart}
      // gridColumn={area.columnStart}
    />
  );
}
type GridItemDivVariant = 'default' | 'hover' | 'selected';
const GridItemDiv = styled.div<{ variant: GridItemDivVariant }>`
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
