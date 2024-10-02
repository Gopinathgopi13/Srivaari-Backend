import { Router } from "express";
import * as cartController from "../controllers/cartController.js";
const cartRouter = Router();

cartRouter.get("/", cartController.getAllCartProductsController);
cartRouter.post("/", cartController.addProductToCartController);
cartRouter.delete("/", cartController.removeProductFromCartController);

export default cartRouter;
