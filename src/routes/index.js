import express from "express";
import config from "../config/config.js";
import UserApi from "../routes/authRoute.js";
import productRoutes from "./productRoute.js";
import cartRoutes from "./cartRoute.js";
import wishlistRoute from "./wishlistRoute.js"
// import DocRoute from "../routes/Swagger/docs.route.js";

const router = express.Router();
// console.log("entereeeeee")
const devRoutes = [
  // routes available only in development mode
  //   {
  //     path: "/docs",
  //     route: DocRoute,
  //   },
  {
    path: "/user",
    route: UserApi,
  },
  {
    path: "/product",
    route: productRoutes,
  },
  {
    path: "/cart",
    route: cartRoutes,
  },
  {
    path: "/wishlist",
    route: wishlistRoute
  }
];

if (config.env === "development") {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

export default router;
