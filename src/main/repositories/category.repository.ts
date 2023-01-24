import { ICategory } from '@entities/category.entity';
import { IBaseRepository } from '@repositories/base.repository';

interface ICategoryRepository extends IBaseRepository<ICategory> {
  findByName(name: string): Promise<ICategory>;
}

export { ICategoryRepository };
