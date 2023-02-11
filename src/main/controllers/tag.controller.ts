// create tag controller for the user usecase

import { Request, Response } from 'express';

import CreateUseCase from '@/main/usecases/tag.usecase';
import BaseController from './base.controller';
import { ITag } from '../entities/tag.entity';

class TagController extends BaseController<ITag> {
  constructor(protected useCase: CreateUseCase) {
    super(useCase);
  }
}

export default TagController;
