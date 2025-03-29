import { editOrderStatusByAdmin, getAllOrderByAdmin } from "../../controllers/admin/orders.controller";
import { addNewProduct, deleteProduct, getAllProducts, getProductById } from "../../controllers/admin/product.controller";
import userRouter from "../../routes/user/user.route";
import { Router } from "express";
const adminRouter = Router()

adminRouter.post('/product/addOne', addNewProduct)
adminRouter.get('/product/getAll', getAllProducts)
adminRouter.get('/product/get/:id', getProductById)
adminRouter.delete('/product/delete/:id', deleteProduct)


adminRouter.get('/orders/getAll', getAllOrderByAdmin)
adminRouter.post('/orders/edit/orderStatus', editOrderStatusByAdmin)
export default adminRouter
