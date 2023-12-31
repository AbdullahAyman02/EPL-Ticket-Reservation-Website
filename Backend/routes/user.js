import { Router } from "express";
import verifyJWT  from "../middleware/verifyJWT.js";
import {
  handleSignup,
  handleLogin,
  handleLogout,
  getUserbyUsername,
  handleEdit,
  handleRefresh,
  UpgradeUser,
  deleteUser,
  handleVerify,
  getAllUsers,
  ApproveUser,
  cancelRequest,
  rejectRequest,
  sendRequest,
} from "../controllers/userController.js";

const userRouter = Router();
userRouter.post("/login", handleLogin);
userRouter.post("/logout", handleLogout);
userRouter.post("/signup", handleSignup);
userRouter.get("/getUserbyUsername/:username", getUserbyUsername);
userRouter.put("/edit", handleEdit);
userRouter.get("/refresh", handleRefresh);
userRouter.get("/verify/:token", handleVerify);

userRouter.put("/cancelRequest", verifyJWT(['F']), cancelRequest);
userRouter.put("/sendRequest", verifyJWT(['F']), sendRequest);

userRouter.use(verifyJWT(['A']));

userRouter.put("/approve", ApproveUser);
userRouter.put("/reject", rejectRequest);
userRouter.put("/upgrade", UpgradeUser);
userRouter.delete("/delete", deleteUser);
userRouter.get("/getAllUsers", getAllUsers);

export default userRouter;
