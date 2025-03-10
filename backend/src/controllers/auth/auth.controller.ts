import { NextFunction, Request, RequestHandler, Response } from "express";
import User from "../../model/User";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'
export const registerUser = async (request: Request, response: Response): Promise<void> => {
    try {
        const { email, password, userName } = request.body
        const hashedPassword = await bcrypt.hash(password, 10);

        const usr = await User.findOne({ email });
        if (usr) {
            response.status(401).json({
                success: true,
                message: "User Already exists with the same email! Please try again"
            });
            return;
        }

        const UserData = new User({
            userName,
            email,
            password: hashedPassword,
            role: 'admin'
        });

        await UserData.save();
        response.status(200).json(
            {
                success: true,
                message: "Registration successful",
            }
        );
    } catch (error) {
        response.status(401).json({
            success: false,
            message: "User doesn't exists! Please register first"
        });
    }
};


export const loginUser = async (request: Request, response: Response) => {
    const { email, password } = request.body
    const user = await User.findOne({ email })
    if (!user) {
        response.status(401).json({
            success: false,
            message: "User doesn't exists! Please register first",
        });

        return
    }

    const isPasswordMatch = await bcrypt.compare(
        password,
        user.password
    );
    if (!isPasswordMatch) {
        response.status(401).json({
            success: false,
            message: "Incorrect password! Please try again"
        });
        return
    }
    if (!process.env.CLIENT_SECRET_KEY) {
        response.status(401).json({
            success: false,
            message: "CLIENT_SECRET_KEY not found"
        });
        return
    }
    const token = jwt.sign(
        {
            _id: user._id,
            email: user.email,
            userName: user.userName,
            role: user.role
        },
        process.env.CLIENT_SECRET_KEY,
        {
            expiresIn: "60d",
        }
    );
    response.cookie("token", token,
        {


            httpOnly: true,
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
            path: '/',
            secure: process.env.NODE_ENV === "production",
            domain: process.env.NODE_ENV === "production" ? "shop-sta.vercel.app" : "localhost",
        }).json({
            success: true,
            message: "Logged in successfully",
            user: {
                email: user.email,
                role: user.role,
                id: user._id,
                userName: user.userName,
            },
        });
}

export const logoutUser = (request: Request, response: Response) => {
    response.clearCookie('token').json({
        success: true,
        message: "Logged out successfully!",
    })
}

export const checkAuth = (request: Request, response: Response) => {
    const user = request.user;
    response.status(200).json({
        success: true,
        message: "Authenticated user!",
        user,
    });
}

