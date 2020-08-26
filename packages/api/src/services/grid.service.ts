import HttpException from "../exceptions/HttpException";
import GridModel from "../models/grid.model";
import { isEmptyObject } from "../utils/util";
/**
 * Grid service
 */
class GridService {
  grids = GridModel;

  findById = async (userId: string) => {
    const findGrid = await this.grids.findById(userId);
    if (!findGrid) throw new HttpException(409, "You're not user");

    return findGrid;
  };

  create = async (gridData: any) => {
    if (isEmptyObject(gridData))
      throw new HttpException(400, "You're not gridData");

    const createUserData = await this.grids.create(gridData);
    return createUserData;
  };
}

export default GridService;
