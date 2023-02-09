import createBaseController, { handleError } from '@/routes/base.routes';
import UserController from '@/main/controllers/user.controller';
import UserUseCase from '@/main/usecases/user.usecase';
import UserRepository, { UserModel } from '@/main/repositories/user.repository';
import { IUser } from '@/main/entities/user.entity';

const userRepository = new UserRepository(UserModel);
const createUserUseCase = new UserUseCase(userRepository);
const userController = new UserController(createUserUseCase);
const userRouter = createBaseController<IUser>(userController);

userRouter.post(
  '/signup',
  handleError((req, res) => userController.signup(req, res)),
);
userRouter.post(
  '/signin',
  handleError((req, res) => userController.signin(req, res)),
);

export default userRouter;
