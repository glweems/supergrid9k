import Box, { BoxProps } from '@/ui/Box';
import { flatten } from 'css-grid-template-parser';
import { useFormikContext } from 'formik';
import React from 'react';
import styled from 'styled-components/macro';
import createGridAreasArray from './createGridItems';
import { GridState } from './GridState';

type GridAreasProps = BoxProps;

const GridAreas: React.FC<GridAreasProps> = ({ ...boxProps }) => {
  const { values } = useFormikContext<GridState>();

  const areas = createGridAreasArray(
    values.gridTemplateRows,
    values.gridTemplateColumns
  );

  const styleObj = {
    gridTemplateRows: flatten(values.gridTemplateRows),
    gridTemplateColumns: flatten(values.gridTemplateColumns),
    gap: flatten(values.gridGap),
  };

  return (
    <GridProperties {...boxProps} style={styleObj}>
      {areas.map(({ id, ...area }) => (
        <GridItem
          key={id}
          bg="secondary"
          gridRow={area.rowStart}
          gridColumn={area.columnStart}
        />
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

const GridItem = styled(Box)`
  border-color: var(--color-primary);
  border-style: solid;
  border-width: 1px;

  .select {
    ::after {
      content: '  ';
    }
  }
`;

export default GridAreas;
