import express, { ErrorRequestHandler } from 'express';
import { dbConnection } from '@/infrastructure/database/mongodb';
import mongoose from 'mongoose';

import allRoutes from '@/routes/all.routes';

const app = express();

mongoose.connect(dbConnection.url);

app.use(express.json());

app.use('/api', allRoutes);

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  const errorMessages = err.message.split(',');
  const stack = err.stack.split('\n');
  res.status(400).json({ error: errorMessages, stack });
};

app.use(errorHandler);

export default app;
