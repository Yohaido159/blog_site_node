import ICategory from '@entities/category.entity';

interface ICategoryRepository {
    create(category: ICategory): Promise<ICategory>;
    update(category: ICategory): Promise<ICategory>;
    delete(id: string): Promise<ICategory>;
    find(id: string): Promise<ICategory>;
    findAll(): Promise<ICategory[]>;

    findByName(name: string): Promise<ICategory>;
}