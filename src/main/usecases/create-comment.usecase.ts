// comments usecase

import { ICommentRepository } from '@repositories/comment.repository';
import { IComment } from '@entities/comment.entity';
import BaseUseCase from './base.usecase';

class CommentUseCase extends BaseUseCase<IComment> {
  constructor(protected repository: ICommentRepository) {
    super(repository);
    this.repository = repository;
  }

  async findByPost(post: string) {
    const comments = await this.repository.findByPost(post);
    return comments;
  }

  async findByAuthor(author: string) {
    const comments = await this.repository.findByAuthor(author);
    return comments;
  }
}

export default CommentUseCase;
