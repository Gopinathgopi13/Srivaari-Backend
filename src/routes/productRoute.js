import { Router } from "express";
import * as productController from "../controllers/productSController.js";
const productRouter = Router();

productRouter.get("/categories", productController.getAllCategoriesController);
productRouter.get("/product/:id", productController.getSingleProductController);
productRouter.post("/", productController.getAllProductsController);



export default productRouter;
