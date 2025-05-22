import express from 'express';
import { getUserProfile, updateUserProfile, deleteUser } from '../controllers/userController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/me', protect, getUserProfile);
router.put('/me', protect, updateUserProfile);
router.delete('/me', protect, deleteUser);

export default router;
