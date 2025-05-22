import express from 'express';
import {
  createOrder,
  getUserOrders,
  updateOrderStatus
} from '../controllers/orderController.js';

import protect from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, createOrder);
router.get('/my', protect, getUserOrders);
router.put('/:orderId/status', protect, updateOrderStatus); // per ristoratori

export default router;
