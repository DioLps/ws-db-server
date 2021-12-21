import { Router } from "express";
import { MainController } from "./controllers/main.controller";

const routes = Router();

routes.get("/", MainController.root);

export default routes;
