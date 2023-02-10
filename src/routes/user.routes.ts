import { handleError, createBaseRouter } from '@/routes/base.routes';
import UserController, { normalizeUserData } from '@/main/controllers/user.controller';
import UserUseCase from '@/main/usecases/user.usecase';
import UserRepository, { UserModel } from '@/main/repositories/user.repository';
import { IUser } from '@/main/entities/user.entity';

import passport from 'passport';
import { Router } from 'express';

const userRepository = new UserRepository(UserModel);
const createUserUseCase = new UserUseCase(userRepository);
const userController = new UserController(createUserUseCase);
const baseUserRouter = createBaseRouter<IUser>(userController);

const userRouter = Router();

userRouter.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  handleError((req, res) => userController.findAll(req, res)),
);

userRouter.get(
  '/me',
  passport.authenticate('jwt', { session: false }),
  handleError((req, res) => userController.me(req, res)),
);

userRouter.post(
  '/signup',
  normalizeUserData,
  handleError((req, res) => userController.signup(req, res)),
);

userRouter.post(
  '/signin',
  normalizeUserData,
  handleError((req, res) => userController.signin(req, res)),
);

export default userRouter.use(baseUserRouter);
