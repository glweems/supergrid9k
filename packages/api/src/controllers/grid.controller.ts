import { NextFunction, Request, Response } from 'express';
import { ExtractFromReq } from 'ts-mongoose';
import GridModel from '../models/grid.model';
import GridService from '../services/grid.service';
class GridController {
  gridService = new GridService();

  getGridFeed = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    try {
      const grids = await this.gridService.findAllGrid();
      res.status(200).json(grids);
    } catch (error) {
      next(error);
    }
  };

  getGridById = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    const gridId = req.params.id;

    try {
      await this.gridService.findById(gridId).then((grid) => {
        if (grid) res.status(200).json(grid);
      });
    } catch (error) {
      next(error);
    }
  };

  createGrid = async (req: Request, res: Response, next: NextFunction) => {
    const grid: ExtractFromReq<typeof GridModel> = req.body;
    console.log('grid: ', grid);

    try {
      res.status(201).json(await this.gridService.create(grid));
    } catch (error) {
      next(error);
    }
  };
}

export default GridController;
