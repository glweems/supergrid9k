import { NextFunction, Request, Response } from 'express';
import { GridState } from '../../../client/src/state';
import { Grid } from '../interfaces/grid.interface';
import gridService from '../services/grid.service';

class UsersController {
  public gridService = new gridService();

  public getUserById = async (req: Request, res: Response, next: NextFunction) => {
    const userId: string = req.params.id;

    try {
      const findOneUserData: Grid = await this.gridService.findGridById(userId);
      res.status(200).json({ data: findOneUserData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createUser = async (req: Request, res: Response, next: NextFunction) => {
    const gridData: GridState = req.body;

    try {
      const createUserData: Grid = await this.gridService.createGrid(gridData);
      res.status(201).json({ data: createUserData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  /* public updateUser = async (req: Request, res: Response, next: NextFunction) => {
    const userId: string = req.params.id;
    const userData: User = req.body;

    try {
      const updateUserData: User = await this.userService.updateUser(userId, userData);
      res.status(200).json({ data: updateUserData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    const userId: string = req.params.id;

    try {
      const deleteUserData: User = await this.userService.deleteUserData(userId);
      res.status(200).json({ data: deleteUserData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  }; */
}

export default UsersController;
