import { Application, Router } from 'express';
import userRouter from '@/routes/user.routes';
import postRouter from '@/routes/post.routes';
import categoryRouter from '@/routes/categories.routes';
import tagsRouter from '@/routes/tags.routes';

const allRoutes = Router();

allRoutes.use('/users', userRouter);
allRoutes.use('/post', postRouter);
allRoutes.use('/categories', categoryRouter);
allRoutes.use('/tags', tagsRouter);

export const registerRoutes = (app: Application) => {
  app.use('/api', allRoutes);
};

