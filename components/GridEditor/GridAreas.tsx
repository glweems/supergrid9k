import { createCssString } from '@/lib/utils';
import { GridState, makeGridAreas, makeGridCss } from '@/store/grid';
import { template } from 'css-grid-template-parser';
import produce from 'immer';
import React from 'react';
import useSWR, { mutate } from 'swr';
import { useImmer } from 'use-immer';
import Box from '../../ui/Box';

interface GridAreasProps {
  endpoint: string;
}
const GridAreas: React.FC<GridAreasProps> = ({ endpoint }) => {
  const { data, error } = useSWR<GridState, GridState>(endpoint, {
    revalidateOnMount: true,
    refreshInterval: 0,
  });

  const [areasState, setAreasState] = useImmer(null);
  const [gridCss, setGridCss] = useImmer(null);

  React.useEffect(() => {
    if (data) {
      setAreasState(() => makeGridAreas(data));
      setGridCss(() => makeGridCss(data));
    }
  }, [data, setAreasState, setGridCss]);

  if (error) return <div>error</div>;

  const handleClick = () => {
    // setAreasState;
    mutate(
      endpoint,
      produce((draft: GridState) => {
        draft.areas = {
          test: {
            row: { start: 0, end: 1, span: 0 },
            column: { start: 0, end: 1, span: 0 },
          },
        };
      }),
      false
    );
  };

  if (!data) return null;

  const styleObj = {
    display: 'grid',
    gridTemplateRows: createCssString(
      data?.gridTemplateRows,
      data?.useCssRepeatFn
      // true // data?.useCssRepeatFn
    ),
    gridTemplateColumns: createCssString(
      data?.gridTemplateColumns,
      // true
      data?.useCssRepeatFn
    ),
    gridTemplateAreas: template({
      width: data?.width,
      height: data?.height,
      areas: {
        test: {
          row: { start: 1, end: 2, span: 1 },
          column: { start: 1, end: 2, span: 1 },
        },
      },
    }),
  };

  return (
    <Box style={{ ...styleObj, ...gridCss }}>
      {areasState?.map((_, index) => (
        <Box
          key={'item' + index}
          bg="primary"
          height="100%"
          width="100%"
          onClick={handleClick}
        >
          asdf
        </Box>
      ))}
    </Box>
  );
};

export default GridAreas;
