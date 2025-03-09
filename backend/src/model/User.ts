import mongoose from "mongoose";
import { Document } from "mongoose";

export interface IUser extends Document {
    email: string;
    userName: string;
    password: string;
    role: string;
    phoneNumber: string;
}

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    userName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: "user",
    },
})

const User = mongoose.model('User', UserSchema)
export default User
