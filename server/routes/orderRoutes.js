import express from 'express';
import { authUser } from '../middleware/authUser.js';
import { addOrdercash, getAllOrders, getUserOrder, updateOrderStatus } from '../controller/orderController.js';

const orderRouter = express.Router();

orderRouter.post('/cash',authUser,addOrdercash);
orderRouter.get('/user/:userId',authUser,getUserOrder);
orderRouter.get("/admin", getAllOrders); // GET all orders (Admin)
orderRouter.put("/admin/:orderId/status", updateOrderStatus); // Update status

export default orderRouter;