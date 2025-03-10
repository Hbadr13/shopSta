import express from 'express'
import { Express } from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'
import cookieParser from "cookie-parser";
import { JwtPayload } from 'jsonwebtoken';
import { authMiddleware } from './Middlewares/authMiddleware';
import { adminMiddleware } from './Middlewares/adminMiddleware';
import cloudinary from 'cloudinary'
import userRouter from './routes/user/user.route'
import adminRouter from './routes/admin/admin.roure'
import shopRouter from './routes/shop/shop.router'
import favoriteRouter from './routes/shop/favorite.routes'
import orderRouter from './routes/shop/order.route'
dotenv.config()
cloudinary.v2.config({
    cloud_name: process.env.REACT_APP_CLOUD_NAME,
    api_key: process.env.REACT_APP_API_KEY,
    api_secret: process.env.REACT_APP_API_SECRET
})

const monogodb_url: string = process.env.MONGODB_URL || ''
mongoose.connect(monogodb_url, {}).then(() => {
}).catch((error) => {
})
const port: string = process.env.PORT || '3333'
const app: Express = express()

app.listen((port), () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
})

app.use(cors(
    {
        methods: ['GET', 'POST', 'DELETE', 'PUT'],
        origin: ['http://localhost:3000', 'http://localhost:3001', 'https://shop-sta.vercel.app', 'http://localhost:5173'],
        allowedHeaders: [
            "Content-Type",
            "Authorization",
            "Cache-Control",
            "Expires",
            "Pragma",
        ],
        credentials: true,
    }
))
declare global {
    namespace Express {
        interface Request {
            user?: JwtPayload | string;
        }
    }
}
app.use(cookieParser());
app.use(express.json())

// routing
app.use('/api/v1/auth', userRouter)
app.use('/api/v1/admin', adminMiddleware, adminRouter)
app.use('/api/v1/shop', shopRouter)
app.use('/api/v1/shop/favorites', authMiddleware, favoriteRouter)
app.use('/api/v1/shop/order', authMiddleware, orderRouter)
