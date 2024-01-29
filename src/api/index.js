import express from 'express';
import emojis from './emojis.js';
import user from './user.js';
import service from './service.js';

import { authenticate } from '../middlewares/middlewares.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏',
  });
});

// user routes
router.use('/emojis', emojis);
router.use('/user', user);
router.use('/service', service);


// test
router.use('/test', authenticate(['admin']), (req, res) => {
  res.status(200).json({ meesage: 'test' });
})

export default router;
