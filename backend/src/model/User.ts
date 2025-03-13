// import mongoose from "mongoose";
// import { Document } from "mongoose";

// export interface IUser extends Document {
//     email: string;
//     userName: string;
//     password: string;
//     role: string;
//     phoneNumber: string;
// }

// const UserSchema = new mongoose.Schema({
//     email: {
//         type: String,
//         required: true,
//         unique: true,
//     },
//     userName: {
//         type: String,
//         required: true,
//     },
//     password: {
//         type: String,
//         required: true,
//     },
//     role: {
//         type: String,
//         default: "user",
//     },
// })

// const User = mongoose.model('User', UserSchema)
// export default User


import mongoose, { Document } from "mongoose";

export interface IAddress {
    company?: string;
    address1: string;
    address2?: string;
    city: string;
    country: string;
    province: string;
    postalCode: string;
    phone: string;
    isDefault: boolean;
}
export interface IAddressWith_Id extends IAddress {
    _id: any;
}

export interface IUser extends Document {
    email: string;
    firstName: string;
    lastName?: string;
    password: string;
    role: string;
    addresses: IAddress[];
}

const AddressSchema = new mongoose.Schema<IAddress>({
    company: { type: String },
    address1: { type: String, required: true },
    address2: { type: String },
    city: { type: String, required: true },
    country: { type: String, required: true },
    province: { type: String, required: true },
    postalCode: { type: String, required: true },
    phone: { type: String, required: true },
    isDefault: { type: Boolean, default: false },
});

const UserSchema = new mongoose.Schema<IUser>({
    email: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: false }, // Not required
    password: { type: String, required: true },
    role: { type: String, default: "user" },
    addresses: { type: [AddressSchema], default: [] },
});

const User = mongoose.model<IUser>("User", UserSchema);
export default User;
