import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { grid, gridCss } from "../../store/grid";
import Box, { BoxProps } from "../../ui/Box";
import styled from "styled-components/macro";

export type GridEntriesProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> &
  BoxProps;

const GridEntries: React.FC<GridEntriesProps> = (props) => {
  const [{ gridTemplateRows, gridTemplateColumns }] = useRecoilState(grid);
  const gridCssState = useRecoilValue(gridCss);

  return (
    <Box {...gridCssState} {...(props as any)}>
      {gridTemplateRows.map(({ id: rowId }) => (
        <React.Fragment key={rowId}>
          {gridTemplateColumns.map(({ id: columnId }) => (
            <GridEntry key={columnId} className="GridEntry" />
          ))}
        </React.Fragment>
      ))}
    </Box>
  );
};

const GridEntry = styled.div`
  background-color: ${({ theme }) => theme.colors.blues[5]};
  border-color: ${({ theme }) => theme.colors.blue};
  border-style: solid;
  border-width: 3px;
`;

export default GridEntries;
