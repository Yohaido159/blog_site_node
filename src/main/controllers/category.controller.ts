// Category Controller for Blog App
// it not related to any dependency just plain typescript depend only the entity and repository (not specific to any database)

import { ICategoryRepository } from '@repositories/category.repository';
import BaseController from '@controllers/base.controller';

class CategoryController extends BaseController {
  private categoryRepository: ICategoryRepository;

  constructor(categoryRepository: ICategoryRepository) {
    super(categoryRepository);
    this.categoryRepository = categoryRepository;
  }

  async findByName(name: string) {
    const category = await this.categoryRepository.findByName(name);
    return category;
  }
}

export default CategoryController;
