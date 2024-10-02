import JsonWebTokenError from "jsonwebtoken";
import config from "../config/config.js";
import bcrypt from "bcryptjs/dist/bcrypt.js";
import logger from "../loaders/logger.js";

const jwt = JsonWebTokenError;

export const generateTokens = (data) => {
  const accessToken = jwt.sign({ token: data }, config.AccessToken, {
    expiresIn: "14m",
  });
  const refreshToken = jwt.sign({ token: data }, config.RefreshToken, {
    expiresIn: "30d",
  });

  return { accessToken, refreshToken };
};

export const hashedPassword = async (password) => {
  try {
    return await bcrypt.hash(password, 10);
  } catch (error) {
    logger.error(error.message);
    throw new Error(error);
  }
};

export const comparePassword = async (password, userPassword) => {
  try {
    const isPasswordValid = await bcrypt.compare(password, userPassword);
    if (!isPasswordValid) {
      throw new Error("Invalid credentials");
    }
    return isPasswordValid;
  } catch (error) {
    logger.error(error.message);
    throw error;
  }
};

export const validate = (schema) => (req, res, next) => {
  console.log(req.body);
  try {
    schema.parse(req.body);
    next();
  } catch (err) {
    return res.status(400).json({
      status: 0,
      message: err.errors.map((e) => e.message),
    });
  }
};

export const generateOTP = () => {
  return Math.floor(1000 + Math.random() * 9000);
};
