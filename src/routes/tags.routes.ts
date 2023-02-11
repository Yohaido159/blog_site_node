import { handleError, createBaseRouter } from '@/routes/base.routes';
import TagController from '@/main/controllers/tag.controller';
import TagUseCase from '@/main/usecases/tag.usecase';
import TagRepository, { TagModel } from '@/main/repositories/tag.repository';
import { ITag } from '@/main/entities/tag.entity';

import passport from 'passport';
import { Router } from 'express';

const tagRepository = new TagRepository(TagModel);
const createTagUseCase = new TagUseCase(tagRepository);
const tagController = new TagController(createTagUseCase);
const baseTagRouter = createBaseRouter<ITag>(tagController);

const tagRouter = Router();

tagRouter.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  handleError((req, res) => tagController.findAll(req, res)),
);

export default tagRouter.use(baseTagRouter);