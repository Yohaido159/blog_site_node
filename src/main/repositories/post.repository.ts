
import { IPost } from '@entities/post.entity';
import BaseRepository, { IBaseRepository } from '@repositories/base.repository';

export interface IPostRepository extends IBaseRepository<IPost> {
  create(entity: { title: string; content: string }): Promise<IPost>;
  searchByTitle(title: string): Promise<IPost[]>;
  searchByContent(content: string): Promise<IPost[]>;
  searchByAuthor(author: string): Promise<IPost[]>;
  searchByTags(tags: string[]): Promise<IPost[]>;
  searchByCategories(categories: string[]): Promise<IPost[]>;
}

import { model, Schema } from 'mongoose';

const PostSchema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String, required: true },
    tags: { type: [String], required: true },
    categories: { type: [String], required: true },
    createdAt: { type: Date, required: true },
    updatedAt: { type: Date, required: true },
});


const PostModel = model<IPost>('Post', PostSchema);

class PostRepository extends BaseRepository<IPost> implements IPostRepository {
    async searchByTitle(title: string) {
        const posts = PostModel.find({ title });
        return posts;
    }

    async searchByContent(content: string) {
        const posts = PostModel.find({ content });
        return posts;
    }

    async searchByAuthor(author: string) {
        const posts = PostModel.find({ author });
        return posts;
    }

    async searchByTags(tags: string[]) {
        const posts = PostModel.find({ tags });
        return posts;
    }

    async searchByCategories(categories: string[]) {
        const posts = PostModel.find({ categories });
        return posts;
    }
}

export default PostRepository;


