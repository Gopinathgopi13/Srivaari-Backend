import express from "express";
import config from "./config/config.js";
import authRouter from "./routes/authRoute.js";
import manageProductRouter from "./routes/admin/manageProductRoute.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cors from "cors";
import { prisma } from "./utils/prisma.js";
import productRouter from "./routes/productRoute.js";
import routes from "./routes/index.js"
const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5174",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);
app.get("/", (req, res) => {
  res.send("site is working");
});

// app.use("/api/auth", authRouter);
// app.post("/login", async (req, res) => {
//   console.log(req.body, "=====> body data");
//   const { email, password } = req.body;
//   try {
//     const user = await prisma.user.findUnique({
//       where: { email },
//       include: {
//         UserRole: {
//           include: {
//             role: true,
//           },
//         },
//       },
//     });

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }

//     const userRoles = user.UserRole.map((userRole) => ({
//       roleId: userRole.role.role_id,
//       roleName: userRole.role.role_name,
//     }));

//     const token = jwt.sign(
//       {
//         userId: user.user_id,
//         roles: userRoles,
//       },
//       // "your-secret-key",
//       config.jwtSecret,
//       { expiresIn: "1h" }
//     );

//     res.status(200).json({
//       message: "Login successful",
//       token,
//       userId: user.user_id,
//       roles: userRoles,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });
app.use("/api/admin", manageProductRouter);
app.use("/api", routes);

app.listen(config.port, () =>
  console.log(`Server running in port: ${config.port}`)
);
