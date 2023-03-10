
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

const postSchema: Schema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    tags: [{ type: Schema.Types.ObjectId, ref: 'Tag' }],
    categories: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  });
  


export const PostModel = model<IPost>('Post', postSchema);

class PostRepository extends BaseRepository<IPost> implements IPostRepository {

    async findAll() {
        const posts = await PostModel.find().populate('author').populate('tags').populate('categories');
        return posts;
    }

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


