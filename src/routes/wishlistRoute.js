import { Router } from "express";
import * as wishlistController from "../controllers/wishlistController.js";
const wishlistRouter = Router();

wishlistRouter.get("/", wishlistController.getAllWishlistProductsController);
wishlistRouter.post("/", wishlistController.addProductToWishlistController);
wishlistRouter.delete("/", wishlistController.removeProductFromWishlistController);

export default wishlistRouter;
