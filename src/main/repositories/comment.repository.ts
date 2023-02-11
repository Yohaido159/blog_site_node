import { IComment } from '@entities/comment.entity';
import BaseRepository, { IBaseRepository } from '@repositories/base.repository';

export interface ICommentRepository extends IBaseRepository<IComment> {
  findByPost(post: string): Promise<IComment[]>;
  findByAuthor(author: string): Promise<IComment[]>;
}

import { model, Schema } from 'mongoose';


const commentSchema: Schema = new Schema({
  post: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});



export const CommentModel = model<IComment>('Comment', commentSchema);

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
