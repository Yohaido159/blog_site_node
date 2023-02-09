import express from 'express';
import { connectToDB } from '@/infrastructure/database/mongodb';

import allRoutes from '@/routes/all.routes';
import { errorHandler, LoggerMiddleware } from '@/server/app.middleware';
import { swaggerMiddleware } from '@/shared/utils/swagger';

const app = express();

connectToDB();
app.use(LoggerMiddleware);
app.use(express.json());

app.use('/api', allRoutes);
app.use('/api-docs', ...swaggerMiddleware);
app.use(errorHandler);

export default app;
