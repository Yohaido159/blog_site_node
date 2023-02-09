// category usecase

import { ICategoryRepository } from '@repositories/category.repository';
import { ICategory } from '@entities/category.entity';
import BaseUseCase from './base.usecase';

class CategoryUseCase extends BaseUseCase<ICategory> {
  constructor(protected repository: ICategoryRepository) {
    super(repository);
  }

  async findByName(name: string) {
    const category = await this.repository.findByName(name);
    return category;
  }
}

export default CategoryUseCase;
