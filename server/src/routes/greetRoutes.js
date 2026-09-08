import express from 'express';
import { getHealth, postGreet } from '../controllers/greetController.js';

const router = express.Router();

// GET /api/health
router.get('/health', getHealth);

// POST /api/greet
router.post('/greet', postGreet);

export default router;
