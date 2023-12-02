import { Route, Router } from "express";
import {
  handleSignup,
  handleLogin,
  handleLogout,
  getUserbyUsername,
  handleEdit,
  handleRefresh,
  UpgradeUser,
  deleteUser,
  handleVerify
} from "../controllers/userController.js";

const userRouter = Router();

userRouter.post("/signup", handleSignup);
userRouter.post("/login", handleLogin);
userRouter.post("/logout", handleLogout);
userRouter.get("/getUserbyUsername/:username", getUserbyUsername);
userRouter.put("/edit", handleEdit);
userRouter.get("/refresh", handleRefresh);
userRouter.put("/upgrade", UpgradeUser);
userRouter.delete("/delete", deleteUser);
userRouter.get("/verify/:token", handleVerify);

export default userRouter;
