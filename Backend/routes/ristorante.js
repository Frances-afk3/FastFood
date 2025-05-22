import express from 'express';
import { registerRistorante, loginRistorante } from '../controllers/ristoranteController.js';

const router = express.Router();

router.post('/register', registerRistorante);
router.post('/login', loginRistorante);

export default router;
