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
import _, { debounce, omit } from 'lodash';
import React from 'react';
import styled from 'styled-components/macro';
import { ColorProps } from 'styled-system';
import useSWR, { mutate } from 'swr';
import { toEditorSettings } from 'typescript';
import { useImmer } from 'use-immer';
import { SuperGrid9kTheme } from '../../lib/theme';
import Button from '../../ui/Button';
import CodeBlock from '../CodeBlock';
import { useGridEditorContext } from './GridContext';
import { area, template } from 'grid-template-parser';
import produce from 'immer';
// import GridEditorItem from './GridEditorItem';

type GridItemsProps = {
  endpoint?: string;
};

type ResizeState = {
  gridRowStart: number;
  gridRowEnd: number;
  gridColumnStart: number;
  gridColumnEnd: number;
};

const GridItems: React.FC<GridItemsProps> = ({ endpoint }) => {
  const { data, error } = useSWR<GridState>(endpoint, {
    revalidateOnMount: true,
  });

  const [gridItemsState, setGridItemsState] = useImmer<GridAreaState[]>(null);
  const [gridCssState, setGridCssState] = useImmer<GridCssObj>(null);
  const [isDragging, setIsDragging] = React.useState(false);
  React.useEffect(() => {
    if (data) {
      setGridItemsState(() => makeGridAreas(data));
      setGridCssState(() => makeGridCss(data));
    }
  }, [data, setGridCssState, setGridItemsState]);

  const [resizeState, setResizeState] = useImmer<ResizeState | null>({});

  if (error) return <div>error</div>;
  const gridWidth = data?.gridTemplateRows.length;
  const gridHeight = data?.gridTemplateColumns.length;
  const gridTemplateAreas = template({
    width: gridWidth,
    height: gridHeight,
    areas: data?.areas ?? {},
  });
  data && console.log(data?.areas?.temp?.row);
  data && console.log(data?.areas?.temp?.column);
  data && console.log(gridTemplateAreas);

  // const styleObj = {gridTemplateRows: gridItemsState?.}
  return (
    <GridRender
      style={{ ...gridCssState, gridTemplateAreas }}
      padding={3}
      className="grid"
    >
      {gridItemsState?.map((item, index) => {
        return (
          <GridEditorItem
            key={item.id}
            endpoint={endpoint}
            index={index}
            {...item}
            gridWidth={gridWidth}
            gridHeight={gridHeight}
            resizeState={resizeState}
            setResizeState={setResizeState}
            setGridItemsState={setGridItemsState}
            isDragging={isDragging}
            setIsDragging={setIsDragging}
          />
        );
      })}
    </GridRender>
  );
};

type UseImmerSetter<T> = (f: (draft: WritableDraft<T>) => void | T) => void;
interface GridEditorItemProps extends GridAreaState {
  endpoint: string;
  index: number;
  resizeState: ResizeState;
  setResizeState: UseImmerSetter<ResizeState>;
  setGridItemsState: UseImmerSetter<GridAreaState[]>;
  isDragging: boolean;
  setIsDragging(boolean): void;
  gridWidth: number;
  gridHeight: number;
}

const GridEditorItem: React.FC<GridEditorItemProps> = ({
  id,
  index,
  endpoint,
  name,
  gridRowStart,
  gridRowEnd,
  gridColumnStart,
  gridColumnEnd,
  resizeState,
  setResizeState,
  setGridItemsState,
  isDragging,
  setIsDragging,
  gridWidth,
  gridHeight,
}) => {
  const [style, setStyle] = useImmer({
    bg: 'primary' as ColorProps<SuperGrid9kTheme>['bg'],
  });
  React.useEffect(() => {
    if (!isDragging && style.bg === 'yellow')
      setStyle((draft) => {
        draft.bg = 'primary';
      });
  }, [isDragging, setStyle, style.bg]);
  return (
    <Box
      bg={style.bg}
      style={omit(style, 'bg')}
      width="100%"
      // whileHover={{ scale: 1.0125, opacity: 0.7 }}
      borderRadius={3}
      onMouseDown={(event) => {
        setIsDragging(true);
        setStyle((draft) => {
          draft.bg = 'yellow';
        });
        setResizeState((draft) => {
          draft.gridRowStart = gridRowStart;
          draft.gridColumnStart = gridColumnStart;
          draft.gridRowEnd = gridRowEnd;
          draft.gridColumnEnd = gridColumnEnd;
        });
        //1 / 1 / 2 / 2
      }}
      onMouseMove={(event) => {
        if (!isDragging) return;

        setStyle((draft) => {
          draft.bg = 'yellow';
        });
      }}
      onMouseUp={(event) => {
        setResizeState((draft) => {
          draft.gridRowStart = gridRowStart;
          draft.gridColumnStart = gridColumnStart;
          draft.gridRowEnd = gridRowEnd;
          draft.gridColumnEnd = gridColumnEnd;
        });

        setIsDragging(false);
        mutate(
          endpoint,
          produce((draft) => {
            draft.areas['temp'] = area({
              x: resizeState.gridRowStart,
              y: resizeState.gridColumnStart,
              width: gridWidth - resizeState.gridRowEnd,
              height: gridWidth - resizeState.gridColumnEnd,
            });
          }),
          false
        );
        setStyle((draft) => {
          draft.bg = 'primary';
        });

        setResizeState(() => {});
      }}
      data-row-start={gridRowStart}
      data-row-end={gridRowEnd}
      data-column-start={gridColumnStart}
      data-column-end={gridColumnEnd}
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
          {Object.entries(resizeState).map(([key, val]) => (
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

  * {
    user-select: none;
  }
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
/*

onClick={(event) => {
        if (!isSelected && !isEditing) {
          setResizeState((draft) => {
            draft.id = id;
            draft.index = index;
            draft.gridRowStart = gridRowStart;
            draft.gridColumnStart = gridColumnStart;
          });
          setStyle((draft) => {
            draft.bg = 'yellow';
          });
        } else {
          setResizeState(() => ({}));
          setStyle((draft) => {
            draft.bg = 'primary';
          });
          setGridItemsState((draft) => {
            draft[resizeState.index].name = 'new';
            draft[resizeState.index].gridRowStart = resizeState.gridRowStart;
            draft[resizeState.index].gridColumnStart =
              resizeState.gridColumnStart;
            draft[resizeState.index].gridRowEnd = resizeState.gridRowEnd;
            draft[resizeState.index].gridColumnEnd = resizeState.gridColumnEnd;
          });
        }
        /*   if (!isEditing)
         */
/*   */

// if (isEditing)

// if (!isSelected)
//   return setResizeState((draft) => {
//     draft.id = id;
//     draft.index = index;
//   });
// if (!isEditing)
//   return setResizeState((draft) => {
//     delete draft.id;
//     delete draft.index;
//     delete draft.gridRowStart;
//     delete draft.gridColumnStart;
//   });
// }}
// onMouseOver={(event) => {
//   if (isEditing && !isSelected) {
//     setStyle((draft) => {
//       draft.bg = 'yellow';
//     });
//     setResizeState((draft) => {
//       draft.gridRowEnd = gridRowEnd;
//       draft.gridColumnEnd = gridColumnEnd;
//     });
//   }
// }}
// onMouseOut={(event) => {
//   if (!isSelected) {
//     setStyle((draft) => {
//       draft.bg = 'primary';
//     });
//   }
// if (isSelected) {
//   // setStyle((state) => ({ ...state, bg: 'yellow' }));
//   setResizeState((draft) => {
//     delete draft.gridRowStart;
//     delete draft.gridColumnStart;
//   });
// }
// }}
