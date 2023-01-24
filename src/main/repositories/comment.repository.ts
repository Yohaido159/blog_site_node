import { IComment } from '@entities/comment.entity';
import { IBaseRepository } from '@repositories/base.repository';

interface ICommentRepository extends IBaseRepository<IComment> {
  findByPost(post: string): Promise<IComment[]>;
  findByAuthor(author: string): Promise<IComment[]>;
}

export { ICommentRepository };
