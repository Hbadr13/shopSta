import { Router } from "express";
import { checkAuth, loginUser, logoutUser, registerUser } from "../../controllers/auth/auth.controller";
import { authMiddleware } from "../../Middlewares/authMiddleware";

const userRouter = Router();





// Routes
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/logout", logoutUser);

// Check authentication status
userRouter.get("/check-auth", authMiddleware, checkAuth);

export default userRouter;
