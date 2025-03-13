import { adminMiddleware } from './Middlewares/adminMiddleware';
import { authMiddleware } from './Middlewares/authMiddleware';
import favoriteRouter from './routes/shop/favorite.routes';
import adminRouter from './routes/admin/admin.roure';;
import orderRouter from './routes/shop/order.route';
import shopRouter from './routes/shop/shop.router'
import userRouter from './routes/user/user.route'
import { JwtPayload } from 'jsonwebtoken';
import cookieParser from "cookie-parser";
import cloudinary from 'cloudinary'
import { Express } from 'express'
import mongoose from 'mongoose'
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import accountRouter from './routes/account/accout.route';

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
    console.log(`\n[server]: Server is running at http://localhost:${port}`);
})

app.use(cors({
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    origin: [
        'http://localhost:3000',
        'http://localhost:3001',
        'https://shop-sta.vercel.app',
        'http://localhost:5173',
    ],
    allowedHeaders: [
        "Content-Type",
        "Authorization",
        "Cache-Control",
        "Expires",
        "Pragma",
    ],
    credentials: true,
}));

declare global {
    namespace Express {
        interface Request {
            user?: JwtPayload | string;
        }
    }
}
app.use(cookieParser());
app.use(express.json())
app.set('trust proxy', 1)

app.use('/api/v1/auth', userRouter)
app.use('/api/v1/admin', adminMiddleware, adminRouter)
app.use('/api/v1/shop', shopRouter)
app.use('/api/v1/account', authMiddleware, accountRouter)
app.use('/api/v1/shop/favorites', authMiddleware, favoriteRouter)
app.use('/api/v1/shop/order', authMiddleware, orderRouter)
