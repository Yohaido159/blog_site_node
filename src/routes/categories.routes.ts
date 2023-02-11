import { handleError, createBaseRouter } from '@/routes/base.routes';
import CategoryController from '@/main/controllers/category.controller';
import CategoryUseCase from '@/main/usecases/category.usecase';
import CategoryRepository, { Category } from '@/main/repositories/category.repository';
import { ICategory } from '@/main/entities/category.entity';

import passport from 'passport';
import { Router } from 'express';

const categoryRepository = new CategoryRepository(Category);
const createCategoryUseCase = new CategoryUseCase(categoryRepository);
const categoryController = new CategoryController(createCategoryUseCase);
const baseCategoryRouter = createBaseRouter<ICategory>(categoryController);

const categoryRouter = Router();

categoryRouter.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  handleError((req, res) => categoryController.findAll(req, res)),
);

export default categoryRouter.use(baseCategoryRouter);