
import IPost from '@entities/post.entity';

interface IPostRepository {
    create(post: IPost): Promise<IPost>;
    update(post: IPost): Promise<IPost>;
    delete(id: string): Promise<IPost>;
    find(id: string): Promise<IPost>;
    findAll(): Promise<IPost[]>;

    searchByTitle(title: string): Promise<IPost[]>;
    searchByContent(content: string): Promise<IPost[]>;
    searchByAuthor(author: string): Promise<IPost[]>;
    searchByTags(tags: string[]): Promise<IPost[]>;
    searchByCategories(categories: string[]): Promise<IPost[]>;
}

export default IPostRepository;