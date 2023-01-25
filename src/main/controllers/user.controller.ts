
import { Request, Response } from 'express';

import CreateUseCase from '@usecases/create-user.usecase';
import BaseController from './base.controller';
import { IUser } from '../entities/user.entity';

class UserController extends BaseController<IUser> {
  constructor(protected useCase: CreateUseCase) {
    super(useCase);
  }

  async signup(req: Request, res: Response) {
    const { email, password } = req.body;
    const user = await this.useCase.signup(email, password);
    res.json(user);
  }

  async signin(req: Request, res: Response) {
    const { email, password } = req.body;
    const user = await this.useCase.signin(email, password);
    res.json(user);
  }
}

export default UserController;