import express from 'express';
import { registerService } from '../controllers/service.js';
import { authenticate } from '../middlewares/middlewares.js';

const router = express.Router();

// routes
router.post('/register', authenticate(['admin']), registerService);

export default router;
