import Axios from 'axios';
import { useQuery } from 'react-query';
import { useRecoilState } from 'recoil';
import { dirtyGrid, grid, GridState } from '../store/grid';
import { omit } from './utils';

export const GridInstance = Axios.create({
  baseURL: `/api/grid/`,
});

export /**
 * Grids instance
 */
const getGrids = async () => await (await GridInstance.get<GridState[]>('')).data;
const getGridById = async (gridId: string) => GridInstance.get(gridId);

export const create = async (_: unknown, grid: GridState) => await GridInstance.post('', grid).then((res) => res.data);

/**
 * Uses grid
 * @param gridId
 * @returns
 */
export function useGrid(gridId: string) {
  const [, setGridState] = useRecoilState(grid);

  const { data, isLoading, error } = useQuery<void, string>(
    gridId,
    (id) => {
      getGridById(id).then(({ data }) => setGridState({ ...data, initialState: data }));
    },
    { enabled: typeof gridId === 'string' }
  );
  return { data, isLoading, error };
}

export function useCreateGrid(): React.ButtonHTMLAttributes<HTMLButtonElement> {
  const [gridState] = useRecoilState(grid);
  const [isDirty] = useRecoilState(dirtyGrid);

  const newGrid = gridState && omit(gridState, '_id');
  const { isLoading, refetch, error } = useQuery(['createGrid', newGrid], create, { enabled: false });

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = async () => {
    await refetch().then((res) => {
      window.location.assign(`/grid/${res._id}`);
    });
  };
  const buttonText = isLoading ? 'Loading' : error ? 'Error' : 'save ';
  return { onClick: handleClick, disabled: isLoading || !isDirty, children: buttonText };
}
