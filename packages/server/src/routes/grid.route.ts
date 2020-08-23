import { Router } from 'express';
import GridController from '../controllers/grid.controller';
import Route from '../interfaces/routes.interface';

class UsersRoute implements Route {
  public path = '/grid';
  public router = Router();
  public gridController = new GridController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/:id`, this.gridController.getUserById);
    this.router.post(`${this.path}`, this.gridController.createUser);
  }
}

export default UsersRoute;
