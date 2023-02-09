import { emailValidator, passwordValidator } from '../services/validator.service';
import { HttpException } from './http.error';

export const throwIfPasswordNotValid = (password: string) => {
  if (!passwordValidator(password)) {
    throw new HttpException(400, 'Password is not strong enough');
  }
};
export const throwIfEmailNotValid = (password: string) => {
  if (!emailValidator(password)) {
    throw new HttpException(400, 'Invalid email address');
  }
};

export const throwIfUserExist = () => {
  throw new HttpException(409, 'User already exists');
};

export const throwIfUserNotExist = () => {
  throw new HttpException(400, 'User does not exist');
};