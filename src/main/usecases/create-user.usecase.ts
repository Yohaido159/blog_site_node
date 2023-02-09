import { IUserRepository } from '@repositories/user.repository';
import { IUser } from '@entities/user.entity';
import BaseUseCase from './base.usecase';
import { emailValidate, passwordValidate } from '@/shared/services/validator.service';
import { JWTGenerator, PasswordHasher } from '@/shared/services/auth.service';
import { InValidEmailError } from '@/shared/errors/user.errors';

const createUser = async (
  {
    name,
    email,
    password,
  }: {
    name: string;
    email: string;
    password: string;
  },
  repository: IUserRepository,
) => {
  return await repository.create({ name, email, password });
};

const hashPassword = async (password: string) => {
  return await PasswordHasher.hash(password);
};

const validatePassword = (password: string) => {
  if (!passwordValidate(password)) {
    throw new Error('Password is not strong enough');
  }
};

const validateIsUserExist = async (email: string, repository: IUserRepository) => {
  const user = await repository.findByEmail(email);
  if (user) {
    throw new Error('User already exists');
  }
};



const generateJWTToken = (user: IUser) => {
  return JWTGenerator.generate({
    id: user._id,
    email: user.email,
  });
};

const verifyPassword = async (password: string, user: IUser) => {
  const isValidPassword = await PasswordHasher.compare(password, user.password);
  if (!isValidPassword) {
    throw new Error('Invalid password');
  }
};

const validateUserExist = (user: IUser) => {
  if (!user) {
    throw new Error('User does not exist');
  }
};

class CreateUserUseCase extends BaseUseCase<IUser> {
  constructor(protected repository: IUserRepository) {
    super(repository);
    this.repository = repository;
  }

  async signup({ name, email, password }: { name: string; email: string; password: string }) {
    await validateIsUserExist(email, this.repository);
    
    const hashedPassword = await PasswordHasher.hash(password);
    const newUser = await createUser({ name, email, password: hashedPassword }, this.repository);

    const token = generateJWTToken(newUser);

    return { user: newUser, token };
  }

  async signin(email: string, password: string) {
    const user = await this.repository.findByEmail(email);
    validateUserExist(user);
    await verifyPassword(password, user);
    
    const token = generateJWTToken(user);
    return { user, token };
  }
}
export default CreateUserUseCase;
