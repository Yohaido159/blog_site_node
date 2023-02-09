import express, { ErrorRequestHandler } from 'express';
import { connectToDB } from '@/infrastructure/database/mongodb';

import allRoutes from '@/routes/all.routes';
import { errorHandler, LoggerMiddleware } from '@/server/app.middleware';

const app = express();

connectToDB();
app.use(LoggerMiddleware);
app.use(express.json());

app.use('/api', allRoutes);

app.use(errorHandler);

export default app;
