import express from 'express';
import user from './user.js';

import { authenticate } from '../middlewares/middlewares.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏',
  });
});

export default router;
