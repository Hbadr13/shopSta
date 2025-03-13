import { NextFunction, Request, RequestHandler, Response } from "express";
import User from "../../model/User";
import bcrypt from "bcryptjs";
import jwt, { JwtPayload } from 'jsonwebtoken'
export const registerUser = async (request: Request, response: Response): Promise<void> => {
    try {
        const { email, lastName, firstName, password } = request.body
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
            lastName,
            firstName,
            email,
            password: hashedPassword,
            role: 'user'
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
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role
        },
        process.env.CLIENT_SECRET_KEY,
        {
            expiresIn: "60d",
        }
    );

    response.
        json({
            success: true,
            message: "Logged in successfully",
            token: token,
            user: {
                email: user.email,
                role: user.role,
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
            },
        });
}

export const logoutUser = (request: Request, response: Response) => {
    response.clearCookie('token').json({
        success: true,
        message: "Logged out successfully!",
    })
}

export const checkAuth = async (request: Request, response: Response) => {
    const email = typeof request.user === "string" ? request.user : (request.user as JwtPayload).email;
    const user = await User.findOne({ email })
    response.status(200).json({
        success: true,
        message: "Authenticated user!",
        user,
    });
}

