
import { IPost } from '@entities/post.entity';
import { IBaseRepository } from '@repositories/base.repository';

interface IPostRepository extends IBaseRepository<IPost> {
    searchByTitle(title: string): Promise<IPost[]>;
    searchByContent(content: string): Promise<IPost[]>;
    searchByAuthor(author: string): Promise<IPost[]>;
    searchByTags(tags: string[]): Promise<IPost[]>;
    searchByCategories(categories: string[]): Promise<IPost[]>;
}

export { IPostRepository };