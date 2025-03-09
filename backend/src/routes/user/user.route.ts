import { checkAuth, loginUser, logoutUser, registerUser } from "@controllers/auth/auth.controller";
import { Router, Request, Response, NextFunction } from "express";
import { JwtPayload } from "jsonwebtoken";
import { authMiddleware } from "src/Middlewares/authMiddleware";

const userRouter = Router();





// Routes
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/logout", logoutUser);

// Check authentication status
userRouter.get("/check-auth", authMiddleware, checkAuth);

export default userRouter;
