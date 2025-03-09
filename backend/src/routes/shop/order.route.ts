import { BayTheOrder, CreateOrder, GetConfirmationByUser, GetOrdersByUser } from "../../controllers/shop/order.controller";
import { Router } from "express";

const orderRouter = Router()
orderRouter.post('/create', CreateOrder)
orderRouter.get('/Confirmation/get/:orderId', GetConfirmationByUser)
orderRouter.put('/pay/:orderId', BayTheOrder)
orderRouter.get('/getAll', GetOrdersByUser)
orderRouter.delete('/delete/:id')
export default orderRouter