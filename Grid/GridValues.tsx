import React, { FC } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { color } from 'styled-system';
import If from '../components/If';
import CreatingArea, { newAreaState } from './CreatingArea';
import GridArea from './GridArea';
import { gridAreasArrayState, gridEntriesState } from './gridAreasState';
import { gridCssState } from './gridCssState';
import TemplateEntry from './TemplateEntry';

export const GridAreas: FC = () => {
  const gridCss = useRecoilValue(gridCssState);
  const areas = useRecoilValue(gridAreasArrayState);
  const entries = useRecoilValue(gridEntriesState);
  const [newArea, setNewArea] = useRecoilState(newAreaState);

  return (
    <GridValuesDiv {...gridCss}>
      {entries?.map(([row, column, gridArea], index) => {
        return (
          <TemplateEntry
            key={`[${row}].${column}`}
            row={row}
            column={column}
            index={index}
            gridArea={gridArea}
          />
        );
      })}
      {areas?.map((area, index) => (
        <GridArea key={`[${area}].${index}`} name={area} />
      ))}

      <If isTrue={newArea}>
        <CreatingArea />
      </If>
    </GridValuesDiv>
  );
};

type GridValuesDivProps = {
  gridTemplateRows: string;
  gridTemplateColumns: string;
  gridTemplateAreas: string;
  rowGap: string;
  columnGap: string;
  bg: string;
};

const GridValuesDiv = styled.div<GridValuesDivProps>`
  ${color};
  display: grid;
  grid-template-areas: ${(props) => props.gridTemplateAreas};
  grid-template-rows: ${(props) => props.gridTemplateRows};
  grid-template-columns: ${(props) => props.gridTemplateColumns};
  gap: ${(props) => [props.rowGap, props.columnGap].join(' ')};
  background: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIj48ZGVmcz48cGF0dGVybiBpZD0icGF0dGVybiIgd2lkdGg9IjI1IiBoZWlnaHQ9IjI1IiB2aWV3Qm94PSIwIDAgNDAsNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSgzMDYpIj48cmVjdCBpZD0icGF0dGVybi1iYWNrZ3JvdW5kIiB3aWR0aD0iNDAwJSIgaGVpZ2h0PSI0MDAlIiBmaWxsPSJyZ2JhKDM2LCA0MSwgNDYsMSkiPjwvcmVjdD4gPHBhdGggZmlsdGVyPSJ1cmwoI2ZpbHRlcjFwYXR0ZXJuKSIgZmlsbD0icmdiYSg4OCwgOTYsIDEwNiwwLjE4KSIgZD0iCiAgICAgICAgICAgICAgICAgIE0wIDE5IGgxMCB2LTIwIGggLTEwIHogCiAgICAgICAgICAgICAgICAgIE0yMCAxOSBoMTAgdi0yMCBoIC0xMCB6CiAgICAgICAgICAgICAgICAgIE0wIDU5IGgxMCB2LTIwIGggLTEwIHogCiAgICAgICAgICAgICAgICAgIE0yMCA1OSBoMTAgdi0yMCBoIC0xMCB6CiAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgIj48L3BhdGg+PHBhdGggZmlsbD0icmdiYSgzNiwgNDEsIDQ2LDEpIiBkPSJNMTAgMjAgaDEwIHYtNiBoIC0xMCB6IE0zMCAyMCBoMTAgdi02IGggLTEwIHoiPjwvcGF0aD48L3BhdHRlcm4+IDxmaWx0ZXIgaWQ9ImZpbHRlcjFwYXR0ZXJuIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9IjAuMDEgMC40NSIgbnVtT2N0YXZlcz0iMiIgcmVzdWx0PSJyZXN1bHQxIj48L2ZlVHVyYnVsZW5jZT48ZmVEaXNwbGFjZW1lbnRNYXAgaW4yPSJyZXN1bHQxIiBzY2FsZT0iMTciIHJlc3VsdD0icmVzdWx0MiIgeENoYW5uZWxTZWxlY3Rvcj0iUiIgaW49IlNvdXJjZUdyYXBoaWMiIHlDaGFubmVsU2VsZWN0b3I9IkciPjwvZmVEaXNwbGFjZW1lbnRNYXA+PGZlQ29tcG9zaXRlIGluMj0icmVzdWx0MiIgaW49IlNvdXJjZUdyYXBoaWMiIG9wZXJhdG9yPSJhdG9wIiByZXN1bHQ9ImNvbXBvc2l0ZUdyYXBoaWMiPjwvZmVDb21wb3NpdGU+PGZlT2Zmc2V0IGluPSJjb21wb3NpdGVHcmFwaGljIiByZXN1bHQ9ImZiU291cmNlR3JhcGhpYyIgZHg9Ii0xLjciPjwvZmVPZmZzZXQ+PC9maWx0ZXI+IDwvZGVmcz4gPHJlY3QgZmlsbD0idXJsKCNwYXR0ZXJuKSIgaGVpZ2h0PSIxMDAlIiB3aWR0aD0iMTAwJSI+PC9yZWN0Pjwvc3ZnPg==');
`;
