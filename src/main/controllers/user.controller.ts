import { Request, Response } from 'express';

import CreateUseCase from '@/main/usecases/user.usecase';
import BaseController from './base.controller';
import { IUser } from '../entities/user.entity';
import { throwIfFieldsMissing } from '@/shared/errors/general.errors';
import { throwIfEmailNotValid, throwIfPasswordNotValid } from '@/shared/errors/user.errors';

class UserController extends BaseController<IUser> {
  constructor(protected useCase: CreateUseCase) {
    super(useCase);
  }

  async signup(req: Request, res: Response) {
    const { name, email, password } = req.body;

    throwIfFieldsMissing({ name, email, password });
    throwIfEmailNotValid(email);
    throwIfPasswordNotValid(password);

    const user = await this.useCase.signup({ name, email, password });
    res.json(user);
  }

  async signin(req: Request, res: Response) {
    const { email, password } = req.body;

    throwIfFieldsMissing({ email, password });
    throwIfEmailNotValid(email);

    const user = await this.useCase.signin(email, password);
    res.json(user);
  }
}

export default UserController;
