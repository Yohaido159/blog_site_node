import { Request, RequestHandler, Response } from 'express';

import CreateUseCase from '@/main/usecases/user.usecase';
import BaseController from './base.controller';
import { IUser } from '../entities/user.entity';
import { throwIfFieldsMissing } from '@/shared/errors/general.errors';
import { throwIfEmailNotValid, throwIfPasswordNotValid } from '@/shared/errors/user.errors';

export const normalizeUserData: RequestHandler = (req, res, next) => {
  req.body.email && (req.body.email = req.body.email.trim().toLowerCase());
  req.body.password && (req.body.password = req.body.password.trim());
  req.body.name && (req.body.name = req.body.name.trim());
  next();
};


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

  async me(req: Request, res: Response) {
    const user = await this.useCase.me(req.user as IUser);
    res.json(user);
  }

  async refresh(req: Request, res: Response) {
    const user = await this.useCase.refreshToken(req.user as IUser);
    res.json(user);
  }

}

export default UserController;
