import Axios from 'axios';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { useRecoilState } from 'recoil';
import { useUser } from '../store/auth';
import { dirtyGrid, grid, GridState } from '../store/grid';
import { omit } from './utils';

export const GridInstance = Axios.create({
  baseURL: `/api/grid/`,
});

export /**
 * Grids instance
 */
const getGrids = async () =>
  await (await GridInstance.get<GridState[]>('')).data;
const getGridById = async (gridId: string) => GridInstance.get(gridId);

export const create = async (_: unknown, grid: GridState) =>
  await GridInstance.post('', grid).then((res) => res.data);

/**
 * Uses grid
 * @param gridId
 * @returns
 */
export function useGrid(gridId: string) {
  const { data, isLoading, error } = useQuery<void, string>(
    gridId,
    (id) => {
      getGridById(id).then(({ data }) => data);
    },
    { enabled: typeof gridId === 'string' }
  );
  return { data, isLoading, error };
}

export function useCreateGrid() {
  const [gridState] = useRecoilState(grid);
  const [isDirty] = useRecoilState(dirtyGrid);
  const router = useRouter();
  const user = useUser();
  const newGrid = {
    ...omit(gridState, '_id', 'initialState'),
    owner: user?.id,
  };

  const { isLoading, refetch, error } = useQuery(
    ['createGrid', newGrid],
    create,
    { enabled: false }
  );

  const handleClick: React.MouseEventHandler<any> = async () => {
    await refetch().then((res) => {
      router.push(`/grid/${res._id}`);
    });
  };
  const buttonText = isLoading ? 'Loading' : error ? 'Error' : 'save ';
  return {
    onClick: handleClick,
    disabled: isLoading || !isDirty,
    children: buttonText,
  };
}
