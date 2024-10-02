import express from "express";
import { userController } from "../controllers/user/index.js";
import { validate } from "../utils/validator.js";
// import { registerSchema } from "../../middlewares/validation-schema.js";
import * as validationSchema from "../middlewares/validation-schema.js";

const router = express.Router();

router.post(
  "/signup",
  validate(validationSchema.registerSchema),
  userController.CreateUserController
);

router.post(
  "/login",
  validate(validationSchema.loginSchema),
  userController.LoginController
);

router.post(
  "/verify-user",
  validate(validationSchema.verifyUser),
  userController.verifyUserController
);

router.post(
  "/forgot-password",
  validate(validationSchema.forgotPassword),
  userController.forgotPasswordController
);

router.post(
  "/reset-Password",
  validate(validationSchema.resetPassword),
  userController.resetPasswordController
);

export default router;
