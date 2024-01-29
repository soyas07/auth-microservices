import express from 'express';
import { refreshToken } from '../controllers/auth.js';

const router = express.Router();

// routes
router.get('/refreshToken', refreshToken);

export default router;
