import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'
export const authMiddleware: any = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized user!",
            });
        }

        const decoded = jwt.verify(token, process.env.CLIENT_SECRET_KEY as string);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({
            success: false,
            message: "Unauthorized user!",
        });
    }
};
