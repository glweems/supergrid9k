import React from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { gridAreas, gridCss, GridArea } from "../../state";
import Box, { BoxProps } from "../../ui/Box";

export type GridEntriesProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> &
  BoxProps;

const GridEntries: React.FC<GridEntriesProps> = (props) => {
  const gridProps = useRecoilValue(gridCss);
  const items = useRecoilValue(gridAreas);

  return (
    <Box display="grid" {...gridProps} {...(props as any)}>
      {items.map((item, index) => (
        <GridItem
          key={item.id}
          {...item}
          css={`
            background-repeat: no-repeat;
          `}
        >
          <GridSubItem></GridSubItem>
        </GridItem>
      ))}
    </Box>
  );
};

const GridItem = styled(Box)<GridArea>`
  background: ${({ theme }) => theme.colors.primary};
  background-image: ${(props) => `url("data:image/svg+xml;utf8,
  <svg xmlns='http://www.w3.org/2000/svg' version='1.1'
       height='100' width='30'>
<text x='0' y='30' fill='black' font-size='30' >${props.number}</text>
  </svg>")`};
  background-repeat: no-repeat;
  background-position: center;
  border-color: ${({ theme }) => theme.colors.primary};
  border-style: solid;
  border-width: 3px;
  border-radius: ${({ theme }) => theme.space[1]}px;
`;

const GridSubItem = styled(Box)`
  align-self: center;
  justify-self: center;
  height: 100%;
  font-weight: 900;
  font-size: 5rem;
  text-align: center;
`;

GridEntries.defaultProps = { className: "GridEntries" };

export default GridEntries;
