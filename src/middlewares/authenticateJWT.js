import jwt from "jsonwebtoken";
import config from "../config/config.js";

export const authenticateJWT = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Get token from 'Bearer <token>'

  if (!token) {
    return res.status(401).json({ message: "Authentication token required" });
  }

  try {
    // Verify and decode the token
    const decoded = jwt.verify(token, config.jwtSecret);
    console.log(decoded, "=====> Decoded")

    // Attach decoded data (userId and roles) to req.user
    req.user = decoded;

    next(); // Proceed to the next middleware or controller
  } catch (error) {
    console.log(error);
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};
