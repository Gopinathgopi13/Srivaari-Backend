import dotenv from "dotenv";

const envFound = dotenv.config();

if (envFound.error) {
  throw new Error(".env file not found..!");
}

process.env.PORT = process.env.PORT || "5005";
export default {
  port: parseInt(process.env.PORT),
  env: process.env.DEV_ENV,
  ip_address: process.env.IP_ADDRESS,
  email: process.env.EMAIL_ID,
  pass: process.env.EMAIL_PASSWORD,

  jwtSecret: process.env.JWT_SECRET,
  AccessToken: process.env.ACCESS_TOKEN,
  RefreshToken: process.env.REFRESH_TOKEN,
};
