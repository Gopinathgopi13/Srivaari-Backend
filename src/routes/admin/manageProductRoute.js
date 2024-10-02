import { Router } from "express";
import * as manageProductController from "../../controllers/admin/manageProductController.js";
import { checkAdminRole } from "../../middlewares/checkAdminRole.js";
import { authenticateJWT } from "../../middlewares/authenticateJWT.js";

const manageProductRouter = Router();

// Product related functions-----
manageProductRouter.post(
  "/admin-products",
  // authenticateJWT,
  // checkAdminRole,
  manageProductController.createProduct
);

manageProductRouter.delete(
  "/products/:id",
  checkAdminRole,
  manageProductController.removeProduct
);

manageProductRouter.put(
  "/products/:id",
  checkAdminRole,
  manageProductController.modifyProduct
);

// Category related functions----
manageProductRouter.post(
  "/admin-categories",
  // authenticateJWT,
  // checkAdminRole,
  manageProductController.createCategory
);

export default manageProductRouter;
