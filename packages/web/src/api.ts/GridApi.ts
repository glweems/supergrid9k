import Axios from 'axios';
import { useQuery } from 'react-query';
import { useRecoilState } from 'recoil';
import { grid, GridState } from '../state';
import { omit } from '../lib/utils';

const backendUrl = process.env.API_URL || 'http://localhost:5000';

export const GridInstance = Axios.create({
  baseURL: `${backendUrl}/grid/`,
});
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

export function useCreateGrid() {
  const [gridState] = useRecoilState(grid);
  const newGrid = omit(gridState as any, '_id');
  const { isLoading, refetch } = useQuery(['createGrid', newGrid], create, { enabled: false });

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = async () => {
    await refetch().then((res) => {
      window.location.assign(`/grid/${res._id}`);
    });
  };

  return { handleClick, isLoading };
}
