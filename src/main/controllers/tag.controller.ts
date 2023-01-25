// create tag controller for the user usecase

import { Request, Response } from 'express';

import CreateUseCase from '@usecases/create-tag.usecase';
import BaseController from './base.controller';
import { ITag } from '../entities/tag.entity';

class TagController extends BaseController<ITag> {
  constructor(protected useCase: CreateUseCase) {
    super(useCase);
  }

  async create(req: Request, res: Response) {
    const { name } = req.body;
    const tag = await this.useCase.create(name);
    res.json(tag);
  }
}

export default TagController;
