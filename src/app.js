import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import { rateLimit } from 'express-rate-limit';
import cookieParser from 'cookie-parser';

import 'dotenv/config';
import { notFound, errorHandler } from './middlewares/middlewares.js';
import api from './api/index.js';

const app = express();
const limiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000, // 24 hrs in milliseconds
  max: 100,
  message: 'You have exceeded the 100 requests in 24 hrs limit!', 
  standardHeaders: true,
  legacyHeaders: false,
});

// middlewares
app.use(cookieParser());
app.use(morgan('dev'));
app.use(cors({
  origin: true,  // Change this to match your client origin
  credentials: true,  // Allow credentials (cookies) to be sent
}));
app.use(helmet());
app.use(express.json());
app.use(limiter);

// routes
app.get('/', (req, res) => {
  res.json({
    message: '🦄🌈✨👋🌎🌍🌏✨🌈🦄',
  });
});

app.use('/api/v1', api);

app.use(notFound);
app.use(errorHandler);

export default app;
