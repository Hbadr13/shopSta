import { Router } from "express";
import { checkAuth, loginUser, logoutUser, registerUser } from "../../controllers/auth/auth.controller";
import { authMiddleware } from "../../Middlewares/authMiddleware";

const userRouter = Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/logout", logoutUser);
userRouter.get("/check-auth", authMiddleware, checkAuth);

export default userRouter;

