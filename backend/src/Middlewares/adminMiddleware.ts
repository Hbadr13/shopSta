import { IUser } from "../../src/model/User";
import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken'
export const adminMiddleware: any = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized user!!",
            });
        }
        const decoded = jwt.verify(token, process.env.CLIENT_SECRET_KEY as string) as IUser;
        if (decoded.role != 'admin')
            return res.status(401).json({
                success: false,
                message: "Unauthorized user!",
            });
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({
            success: false,
            message: "Unauthorized user!",
        });
    }
};
