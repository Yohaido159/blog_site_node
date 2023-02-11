import CommentUseCase from '@/main/usecases/comment.usecase';
import CommentRepository, { CommentModel } from '@/main/repositories/comment.repository';
import { IComment } from '@/main/entities/comment.entity';

import passport from 'passport';
import { Router } from 'express';
import { createBaseRouter, handleError } from './base.routes';
import CommentController from '@/main/controllers/comment.controller';

const commentRepository = new CommentRepository(CommentModel);
const createCommentUseCase = new CommentUseCase(commentRepository);
const commentController = new CommentController(createCommentUseCase);
const baseCommentRouter = createBaseRouter<IComment>(commentController);

const commentRouter = Router();

commentRouter.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  handleError((req, res) => commentController.findAll(req, res)),
);

export default commentRouter.use(baseCommentRouter);
