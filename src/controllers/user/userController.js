import { userService } from "../../services/user/index.js";

export const CreateUserController = async (req, res) => {
  try {
    const { response, message } = await userService.CreateUserService(req.body);
    res.status(200).json({
      status: 1,
      message: message,
      data: response,
    });
  } catch (error) {
    console.log(error);
    if (error === "This email is already exists.") {
      res.status(200).json({
        status: 0,
        message: error,
      });
    }
    res.status(400).json({
      status: 0,
      message: "Internal Server Error",
    });
  }
};

export const LoginController = async (req, res) => {
  try {
    const response = await userService.LoginService(req.body);
    console.log(response);
    res.status(200).json({
      status: 1,
      message: "Logged in successfully...!",
      data: { ...response },
    });
  } catch (error) {
    res.status(400).json({
      status: 0,
      message: error.message,
    });
  }
};
export const verifyUserController = async (req, res) => {
  try {
    const response = await userService.verifyUserService(req.body);
    console.log(response);
    res.status(200).json({
      status: 1,
      message: "Logged in successfully...!",
      data: { ...response },
    });
  } catch (error) {
    res.status(400).json({
      status: 0,
      message: error.message,
    });
  }
};
export const forgotPasswordController = async (req, res) => {
  try {
    const { response, messgae } = await userService.forgotPasswordService(
      req.body
    );
    console.log(response);
    res.status(200).json({
      status: 1,
      message: "Mail send sucessfully",
      data: { ...response },
    });
  } catch (error) {
    res.status(400).json({
      status: 0,
      message: error.message,
    });
  }
};
export const resetPasswordController = async (req, res) => {
  try {
    const response = await userService.resetPasswordService(req.body);
    console.log(response);
    res.status(200).json({
      status: 1,
      message: "Password reset sucessfully",
      data: { ...response },
    });
  } catch (error) {
    res.status(400).json({
      status: 0,
      message: error.message,
    });
  }
};
