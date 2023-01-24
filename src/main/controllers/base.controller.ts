// create base controller that recieve usecase for CRUD operations

import { Request, Response } from 'express';

import BaseUseCase from '@usecases/base.usecase';

class BaseController<T> {
  protected useCase: BaseUseCase<T>;

  constructor(useCase: BaseUseCase<T>) {
    this.useCase = useCase;
  }

  async findAll(req: Request, res: Response) {
    const entities = await this.useCase.findAll();
    res.json(entities);
  }

  async findById(req: Request, res: Response) {
    const { id } = req.params;
    const entity = await this.useCase.findById(id);
    res.json(entity);
  }

  async create(req: Request, res: Response) {
    const entity = await this.useCase.create(req.body);
    res.json(entity);
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const entity = await this.useCase.update(id, req.body);
    res.json(entity);
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const entity = await this.useCase.delete(id);
    res.json(entity);
  }
}

export default BaseController;
