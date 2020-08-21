import React from "react";
import { useRecoilValue } from "recoil";
import { dotted, wavyZigzag } from "../../lib/backgrounds";
import { gridAreas, gridCss } from "../../state";
import Box, { BoxProps } from "../../ui/Box";

export type GridItemsProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> &
  BoxProps;

const GridItems: React.FC<GridItemsProps> = (props) => {
  const gridProps = useRecoilValue(gridCss);
  const items = useRecoilValue(gridAreas);

  return (
    <Box as="section" height="100%" className="GridEditorItems">
      <Box
        display="grid"
        {...gridProps}
        justifyContent="stretch"
        justifyItems="stretch"
        alignContent="stretch"
        alignItems="stretch"
        className="grid"
        height="100%"
      >
        {items.map(({ id, number }, index) => (
          <Box
            key={id}
            css={`
              background: ${index % 2 === 0 ? wavyZigzag : dotted};
            `}
            borderRadius={4}
            padding={2}
          >
            <Box
              bg="background"
              height={30}
              width={25}
              css={`
                text-align: center;
              `}
              borderRadius={4}
            >
              {number}
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

GridItems.defaultProps = { className: "GridItems" };

export default GridItems;
