import { Router } from "express";
import GridController from "../controllers/grid.controller";
import Route from "../interfaces/routes.interface";

class GridRoute implements Route {
  public path = "/grid";
  public router = Router();
  public gridController = new GridController();

  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get(`${this.path}/:id`, this.gridController.getUserById);
    this.router.post(`${this.path}`, this.gridController.createGrid);
  }
}

export default GridRoute;
