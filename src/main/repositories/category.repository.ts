import { ICategory } from '@entities/category.entity';
import BaseRepository, { IBaseRepository } from '@repositories/base.repository';
import mongoose , { Schema } from 'mongoose';

interface ICategoryRepository extends IBaseRepository<ICategory> {
  findByName(name: string): Promise<ICategory[]>;
}

export { ICategoryRepository };

const categorySchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const Category = mongoose.model<ICategory>('Category', categorySchema);

class CategoryRepository extends BaseRepository<ICategory> implements ICategoryRepository {
  async findByName(name: string) {
    const Categorys = await Category.find({ name });
    return Categorys;
  }
}

export default CategoryRepository;
