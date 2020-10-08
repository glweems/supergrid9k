import Axios from 'axios';
import { useQuery } from 'react-query';
import { GridState } from '../components/GridEditor/GridState';

export const GridInstance = Axios.create({
  baseURL: `/api/grid/`,
});

export /**
 * Grids instance
 */
const getGrids = async () => (await GridInstance.get<GridState[]>('')).data;
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
