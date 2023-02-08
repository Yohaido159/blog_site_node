// Category Controller for Blog App
// it not related to any dependency just plain typescript depend only the entity and repository (not specific to any database)

import BaseController from '@controllers/base.controller';
import { Request, Response } from 'express-serve-static-core';
import { ICategory } from '../entities/category.entity';
import CreateUseCase from '../usecases/create-category.usecase';

class CategoryController extends BaseController<ICategory> {
  constructor(protected useCase: CreateUseCase) {
    super(useCase);
  }

  async findByName(req: Request, res: Response) {
    const { name } = req.body;
    const category = await this.useCase.findByName(name);
    res.json(category);
  }
}

export default CategoryController;
