import { handleError, createBaseRouter } from '@/routes/base.routes';
import PostController from '@/main/controllers/post.controller';
import PostUseCase from '@/main/usecases/post.usecase';
import PostRepository, { PostModel } from '@/main/repositories/post.repository';
import { IPost } from '@/main/entities/post.entity';

import passport from 'passport';
import { Router } from 'express';

const postRepository = new PostRepository(PostModel);
const createPostUseCase = new PostUseCase(postRepository);
const postController = new PostController(createPostUseCase);
const basePostRouter = createBaseRouter<IPost>(postController);

const postRouter = Router();

postRouter.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  handleError((req, res) => postController.findAll(req, res)),
);

postRouter.post(
  '/search/title',
  handleError((req, res) => postController.searchByTitle(req, res)),
);

postRouter.post(
  '/search/content',
  handleError((req, res) => postController.searchByContent(req, res)),
);

postRouter.post(
  '/search/author',
  handleError((req, res) => postController.searchByAuthor(req, res)),
);

postRouter.post(
  '/search/tags',
  handleError((req, res) => postController.searchByTags(req, res)),
);

postRouter.post(
  '/search/categories',
  handleError((req, res) => postController.searchByCategories(req, res)),
);

export default postRouter.use(basePostRouter);