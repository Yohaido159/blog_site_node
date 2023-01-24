
import { ICommentRepository } from '@repositories/comment.repository';
import BaseController from '@controllers/base.controller';

class CommentController extends BaseController {
  private commentRepository: ICommentRepository;

  constructor(commentRepository: ICommentRepository) {
    super(commentRepository);
    this.commentRepository = commentRepository;
  }

  async findByPost(post: string) {
    const comments = await this.commentRepository.findByPost(post);
    return comments;
  }

  async findByAuthor(author: string) {
    const comments = await this.commentRepository.findByAuthor(author);
    return comments;
  }
}

export default CommentController;
