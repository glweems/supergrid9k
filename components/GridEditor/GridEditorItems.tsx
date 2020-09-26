import {
  GridAreaState,
  GridCssObj,
  GridState,
  makeGridAreas,
  makeGridCss,
} from '@/store/grid';
import Box from '@/ui/Box';
import { AnimateSharedLayout, motion } from 'framer-motion';
import { WritableDraft } from 'immer/dist/types/types-external';
import _, { omit } from 'lodash';
import React from 'react';
import styled from 'styled-components/macro';
import { ColorProps } from 'styled-system';
import useSWR from 'swr';
import { toEditorSettings } from 'typescript';
import { useImmer } from 'use-immer';
import { SuperGrid9kTheme } from '../../lib/theme';
import Button from '../../ui/Button';
import CodeBlock from '../CodeBlock';
import { useGridEditorContext } from './GridContext';
// import GridEditorItem from './GridEditorItem';

type GridItemsProps = {
  endpoint?: string;
};

interface ResizeState
  extends Partial<
    Pick<
      GridAreaState,
      'gridRowStart' | 'gridRowEnd' | 'gridColumnStart' | 'gridColumnEnd'
    >
  > {
  id?: GridAreaState['id'];
  hoverId?: GridAreaState['id'];
}

const GridItems: React.FC<GridItemsProps> = ({ endpoint }) => {
  const { data, error } = useSWR<GridState>(endpoint);

  const [gridItemsState, setGridItemsState] = useImmer<GridAreaState[]>(null);
  const [gridCssState, setGridCssState] = useImmer<GridCssObj>(null);

  React.useEffect(() => {
    if (data) {
      setGridItemsState(() => makeGridAreas(data));
      setGridCssState(() => makeGridCss(data));
    }
  }, [data, setGridCssState, setGridItemsState]);

  const [resizeState, setResizeState] = React.useState<ResizeState | null>(
    null
  );

  if (error) return <div>error</div>;
  return (
    <GridRender {...gridCssState} padding={3} className="grid">
      {gridItemsState?.map((item, index) => {
        return (
          <GridEditorItem
            key={item.id}
            endpoint={endpoint}
            index={index}
            {...item}
            resizeState={resizeState}
            setResizeState={setResizeState}
            setGridItemsState={setGridItemsState}
          />
        );
      })}
    </GridRender>
  );
};
interface GridEditorItemProps extends GridAreaState {
  endpoint: string;
  resizeState: ResizeState;
  index: number;
  setResizeState: React.Dispatch<React.SetStateAction<ResizeState>>;
  setGridItemsState: (
    f: (draft: WritableDraft<GridAreaState>[]) => void | GridAreaState[]
  ) => void;
}

const GridEditorItem: React.FC<GridEditorItemProps> = ({
  id,
  index,
  endpoint,
  gridRowStart,
  gridRowEnd,
  gridColumnStart,
  gridColumnEnd,
  resizeState,
  setResizeState,
  setGridItemsState,
}) => {
  const [style, setStyle] = useImmer({
    gridRowStart,
    gridRowEnd,
    gridColumnStart,
    gridColumnEnd,
    bg: 'primary' as ColorProps<SuperGrid9kTheme>['bg'],
  });

  return (
    <Box
      bg={style.bg}
      style={omit(style, 'bg')}
      width="100%"
      // whileHover={{ scale: 1.0125, opacity: 0.7 }}
      borderRadius={3}
      onClick={(event) => {
        if (!resizeState?.id) {
          setResizeState({
            id,
            gridRowStart: style.gridRowStart,
            gridColumnStart: style.gridColumnStart,
          });
          setStyle((draft) => {
            draft.bg = 'yellow';
          });
          return;
        }

        if (resizeState?.id === id) {
          setResizeState(null);
          setStyle((draft) => {
            draft.bg = 'primary';
          });
          return;
        }

        setGridItemsState((draft) => {
          draft[index].gridRowStart = resizeState.gridRowStart;
          draft[index].gridRowEnd = resizeState.gridRowEnd;
          draft[index].gridColumnStart = resizeState.gridColumnStart;
          draft[index].gridColumnEnd = resizeState.gridColumnEnd;
          return draft;
        });
        setResizeState(null);
      }}
      onMouseOver={(event) => {
        if (resizeState?.id) {
          setStyle((state) => ({ ...state, bg: 'yellow' }));
          if (resizeState !== null && resizeState?.id !== id) {
            setResizeState(({ id: prevId }) => ({
              id: prevId,
              gridRowStart: resizeState.gridRowStart,
              gridColumnStart: resizeState.gridColumnStart,
              gridRowEnd: style.gridRowEnd,
              gridColumnEnd: style.gridColumnEnd,
            }));
          }
        }
      }}
      // onMouseOut={(event) => {
      //   if (resizeState?.id !== id) {
      //     setStyle((draft) => {
      //       draft.bg = 'primary';
      //     });
      //   }
      // }}
      data-row-start={style.gridRowStart}
      data-row-end={style.gridRowEnd}
      data-column-start={style.gridColumnStart}
      data-column-end={style.gridColumnEnd}
    >
      <Box display="flex" justifyContent="space-between" color="bg">
        <ul>
          {Object.entries(style).map(([key, val]) => (
            <Box key={key} fontSize={'.75rem'}>
              {`${key}: ${val}`}
            </Box>
          ))}
        </ul>
        <ul>
          {resizeState &&
            Object.entries(resizeState).map(([key, val]) => (
              <Box key={key} fontSize={'.75rem'}>
                {`${key}: ${val}`}
              </Box>
            ))}
        </ul>
      </Box>
    </Box>
  );
};
const GridRender = styled(Box)`
  display: grid;
  height: 100%;
`;

export default GridItems;

/* const rowStart = event.currentTarget.attributes.getNamedItem('data-row-start')
  .value;
const rowEnd = event.currentTarget.attributes.getNamedItem('data-row-end')
  .value;
const columnStart = event.currentTarget.attributes.getNamedItem(
  'data-column-start'
).value;
const columnEnd = event.currentTarget.attributes.getNamedItem('data-column-end')
  .value; */
