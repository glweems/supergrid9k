import React from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components/macro";
import { gridAreas, gridCss } from "../../state";
import Box, { BoxProps } from "../../ui/Box";
import GridEditorItem from "./GridEditorItem";

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
      <GridRender {...gridProps} padding={3} className="grid">
        {items?.map(({ id, number }) => (
          <GridEditorItem key={id} number={number} />
        ))}
      </GridRender>
    </Box>
  );
};

const GridRender = styled(Box)`
  display: grid;
  height: 100%;
  background: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIj48ZGVmcz48cGF0dGVybiBpZD0icGF0dGVybiIgd2lkdGg9IjI5IiBoZWlnaHQ9IjI5IiB2aWV3Qm94PSIwIDAgNDAsNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSgxMzUpIj48cmVjdCBpZD0icGF0dGVybi1iYWNrZ3JvdW5kIiB3aWR0aD0iNDAwJSIgaGVpZ2h0PSI0MDAlIiBmaWxsPSJyZ2JhKDI0LCAyNSwgMjYsMSkiPjwvcmVjdD4gPHBhdGggZmlsbD0icmdiYSg2OCwgNzMsIDgwLDEpIiBkPSJNIC0xMCAzMCBoIDYwIHY0IGgtNjB6IE0tMTAgLTEwIGg2MCB2NCBoLTYwIj48L3BhdGg+PHBhdGggZmlsbD0icmdiYSg1OSwgNjYsIDEwOSwxKSIgZD0ibSAtMTAgMTggaCA2MCB2NCBoLTYweiBNLTEwIC0yMiBoNjAgdjQgaC02MHoiPjwvcGF0aD48L3BhdHRlcm4+ICA8L2RlZnM+IDxyZWN0IGZpbGw9InVybCgjcGF0dGVybikiIGhlaWdodD0iMTAwJSIgd2lkdGg9IjEwMCUiPjwvcmVjdD48L3N2Zz4=");
`;

GridItems.defaultProps = { className: "GridItems" };

export default GridItems;
