import { Router } from "express";
import { getUser, updateUser, addAddress, deleteAddress, updateAddress } from "../../controllers/account/account.controller";

const accountRouter = Router();

accountRouter.get("/profile", getUser);
accountRouter.put("/profile", updateUser);
accountRouter.post("/address", addAddress);
accountRouter.put("/address/:addressId", updateAddress);  // <-- Add this line
accountRouter.delete("/address/:addressId", deleteAddress);

export default accountRouter;
