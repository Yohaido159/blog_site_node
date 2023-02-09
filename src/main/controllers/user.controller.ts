import { Request, Response } from 'express';

import CreateUseCase from '@usecases/create-user.usecase';
import BaseController from './base.controller';
import { IUser } from '../entities/user.entity';
import { emailValidate, passwordValidate } from '@/shared/services/validator.service';
import { PasswordHasher } from '@/shared/services/auth.service';

class UserController extends BaseController<IUser> {
  constructor(protected useCase: CreateUseCase) {
    super(useCase);
  }

  async signup(req: Request, res: Response) {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    if (!emailValidate(email)) {
      return res.status(400).json({ error: 'Invalid email address' });
    }

    if (!passwordValidate(password)) {
      return res.status(400).json({ error: 'Password does not meet the requirements' });
    }

    const user = await this.useCase.signup({ name, email, password });
    res.json(user);
  }

  async signin(req: Request, res: Response) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    if (!emailValidate(email)) {
      return res.status(400).json({ error: 'Invalid email address' });
    }

    const user = await this.useCase.signin(email, password);
    res.json(user);
  }
}

export default UserController;
