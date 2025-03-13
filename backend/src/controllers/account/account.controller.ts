import { Request, Response } from "express";
import User, { IAddressWith_Id } from "../../model/User";

export const getUser = async (req: Request, res: Response): Promise<void> => {
    try {
        if (!req.user) {
            res.status(401).json({ success: false, message: "Unauthenticated user" });
            return;
        }

        const userId = typeof req.user === "string" ? req.user : req.user._id;
        const user = await User.findById(userId).select("-password");

        if (!user) {
            res.status(404).json({ success: false, message: "User not found" });
            return;
        }
        console.log('user', user)
        res.status(200).json({ success: true, message: "User fetched successfully", account: user });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error });
    }
};

export const updateUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userName, lastName } = req.body;

        if (!req.user) {
            res.status(401).json({ success: false, message: "Unauthenticated user" });
            return;
        }

        const userId = typeof req.user === "string" ? req.user : req.user._id;
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { userName, lastName },
            { new: true, runValidators: true }
        ).select("-password");

        if (!updatedUser) {
            res.status(404).json({ success: false, message: "User not found" });
            return;
        }

        res.status(200).json({ success: true, message: "User updated successfully", account: updatedUser });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error });
    }
};

export const addAddress = async (req: Request, res: Response): Promise<void> => {
    try {
        const { company, address1, address2, city, country, province, postalCode, phone, isDefault } = req.body;

        if (!req.user) {
            res.status(401).json({ success: false, message: "Unauthenticated user" });
            return;
        }

        const userId = typeof req.user === "string" ? req.user : req.user._id;
        const user = await User.findById(userId);

        if (!user) {
            res.status(404).json({ success: false, message: "User not found" });
            return;
        }

        const newAddress = { company, address1, address2, city, country, province, postalCode, phone, isDefault };

        if (isDefault) {
            user.addresses.forEach((addr) => (addr.isDefault = false));
        }

        user.addresses.push(newAddress);
        const account = await user.save();

        res.status(201).json({ success: true, message: "Address added successfully", account });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error });
    }
};

export const updateAddress = async (req: Request, res: Response): Promise<void> => {
    try {
        if (!req.user) {
            res.status(401).json({ success: false, message: "Unauthenticated user" });
            return;
        }

        const userId = typeof req.user === "string" ? req.user : req.user._id;
        const { addressId } = req.params;
        const { company, address1, address2, city, country, province, postalCode, phone, isDefault } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            res.status(404).json({ success: false, message: "User not found" });
            return;
        }

        // Find the address by ID
        const addressIndex = user.addresses.findIndex((addr) => (addr as IAddressWith_Id)._id.toString() === addressId);
        if (addressIndex === -1) {
            res.status(404).json({ success: false, message: "Address not found" });
            return;
        }

        user.addresses[addressIndex] = {
            ...user.addresses[addressIndex],
            company,
            address1,
            address2,
            city,
            country,
            province,
            postalCode,
            phone,
            isDefault,
        };

        // If the updated address is set as default, ensure other addresses are not default
        if (isDefault) {
            user.addresses.forEach((addr, idx) => {
                if (idx !== addressIndex) addr.isDefault = false;
            });
        }

        await user.save();

        res.status(200).json({ success: true, message: "Address updated successfully", addresses: user.addresses });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error });
    }
};

export const deleteAddress = async (req: Request, res: Response): Promise<void> => {
    try {
        if (!req.user) {
            res.status(401).json({ success: false, message: "Unauthenticated user" });
            return;
        }

        const userId = typeof req.user === "string" ? req.user : req.user._id;
        const user = await User.findById(userId);

        if (!user) {
            res.status(404).json({ success: false, message: "User not found" });
            return;
        }

        const addressId = req.params.addressId;
        user.addresses = user.addresses.filter((addr) => (addr as IAddressWith_Id)._id.toString() !== addressId);

        await user.save();

        res.status(200).json({ success: true, message: "Address removed successfully", addressId });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error });
    }
};
