import { motion, useDragControls } from "framer-motion";
import React from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { GridArea, gridAreas, gridCss } from "../../state";
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
        <GridItem key={item.id} {...item}></GridItem>
      ))}
    </Box>
  );
};

const GridItem: React.FC<GridArea> = () => {
  const dragControls = useDragControls();

  const startDrag: React.MouseEventHandler<HTMLDivElement> = (event) => {
    dragControls.start(event, { snapToCursor: true });
  };

  return (
    <GridItemStyles>
      <div
        onMouseDown={startDrag}
        css={`
          background-color: var(--color-secondary);
          height: 10px;
          width: 10px;
        `}
      />
      <motion.div drag="x" dragControls={dragControls}>
        div
      </motion.div>
    </GridItemStyles>
  );
};

const GridItemStyles = styled(Box)`
  background-color: var(--color-primary);
`;

GridEntries.defaultProps = { className: "GridEntries" };

export default GridEntries;
