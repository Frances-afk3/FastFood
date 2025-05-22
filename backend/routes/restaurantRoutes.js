import express from 'express';
import {
  getRestaurants,
  getRestaurantById,
  createMeal,
  updateRestaurantInfo
} from '../controllers/restaurantController.js';

import protect from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getRestaurants);
router.get('/:id', getRestaurantById);
router.put('/:id', protect, updateRestaurantInfo);
router.post('/:id/meals', protect, createMeal); // ristoratore aggiunge piatto

export default router;
