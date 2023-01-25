import { IComment } from '@entities/comment.entity';
import BaseRepository, { IBaseRepository } from '@repositories/base.repository';

export interface ICommentRepository extends IBaseRepository<IComment> {
  findByPost(post: string): Promise<IComment[]>;
  findByAuthor(author: string): Promise<IComment[]>;
}

import { model, Schema } from 'mongoose';

const CommentSchema = new Schema({
  content: { type: String, required: true },
  author: { type: String, required: true },
  post: { type: String, required: true },
  createdAt: { type: Date, required: true },
  updatedAt: { type: Date, required: true },
});

const CommentModel = model<IComment>('Comment', CommentSchema);

class CommentRepository extends BaseRepository<IComment> implements ICommentRepository {
  async findByPost(post: string) {
    const comments = await CommentModel.find({ post });
    return comments;
  }

  async findByAuthor(author: string) {
    const comments = await CommentModel.find({ author });
    return comments;
  }
}

export default CommentRepository;
