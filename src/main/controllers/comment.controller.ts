import { Request, Response } from 'express';

import BaseController from '@controllers/base.controller';
import { IComment } from '@entities/comment.entity';
import CreateUseCase from '@usecases/create-comment.usecase';

class CommentController extends BaseController<IComment> {
  constructor(protected useCase: CreateUseCase) {
    super(useCase);
  }

  async findByPost(req: Request, res: Response) {
    const { post } = req.body;
    const comments = await this.useCase.findByPost(post);
    res.json(comments);
  }

  async findByAuthor(req: Request, res: Response) {
    const { author } = req.body;
    const comments = await this.useCase.findByAuthor(author);
    res.json(comments);
  }
}

export default CommentController;
