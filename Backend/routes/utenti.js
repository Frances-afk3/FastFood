import express from 'express';
import { registerUtenti, loginUtenti } from '../controllers/userController.js';

const router = express.Router();

router.post('/register', registerUtenti);
router.post('/login', loginRUtenti);

export default router;
