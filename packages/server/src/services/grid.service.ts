import { GridState } from '../../../client/src/state';
import HttpException from '../exceptions/HttpException';
import { Grid } from '../interfaces/grid.interface';
import gridModel from '../models/grid.model';
import { isEmptyObject } from '../utils/util';
export default class GridService {
  public grids = gridModel;

  public async findGridById(userId: string): Promise<Grid> {
    const findGrid: Grid = await this.grids.findById(userId);
    if (!findGrid) throw new HttpException(409, "You're not user");

    return findGrid;
  }

  public async createGrid(gridData: GridState): Promise<Grid> {
    if (isEmptyObject(gridData)) throw new HttpException(400, "You're not gridData");

    const createUserData: Grid = await this.grids.create({ grid: gridData });
    return createUserData;
  }
}
