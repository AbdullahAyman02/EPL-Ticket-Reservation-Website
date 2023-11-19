import { Route, Router } from "express";
import {
  handleSignup,
  handleLogin,
  handleLogout,
  handleRefresh,
  handleVerify,
} from "../controllers/userController.js";

const userRouter = Router();

userRouter.post("/signup", handleSignup);
userRouter.post("/login", handleLogin);
userRouter.post("/logout", handleLogout);
userRouter.get("/refresh", handleRefresh);
userRouter.get("/verify/:token", handleVerify);

export default userRouter;
