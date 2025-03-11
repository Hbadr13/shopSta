import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'
export const authMiddleware: any = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization;
        // console.log('token', req.cookies.token)
        // console.log('token1', req.headers.authorization)
        // console.log('Authorization', req.headers)
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
