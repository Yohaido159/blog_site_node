import express from 'express';
import passport from 'passport';
import { connectToDB } from '@/infrastructure/database/mongodb';

import allRoutes from '@/routes/all.routes';
import { errorHandler, initPassport, LoggerMiddleware } from '@/server/app.middleware';
import { swaggerMiddleware } from '@/shared/utils/swagger';

const app = express();

initPassport();
connectToDB();

app.use(LoggerMiddleware);
app.use(express.json());
app.use(passport.initialize());



app.use('/api', allRoutes);
app.use('/api-docs', ...swaggerMiddleware);
app.use(errorHandler);

export default app;
