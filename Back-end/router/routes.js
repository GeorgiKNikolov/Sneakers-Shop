import { Router } from "express";
import sneakersController from "../controllers/sneakersController.js";
import authController from "../controllers/authController.js";
import brandControler from "../controllers/brandController.js";
import commentController from "../controllers/commentController.js";

const routers = Router();

routers.use(authController);
routers.use(sneakersController);
routers.use(brandControler);
routers.use(commentController)

export default routers;
