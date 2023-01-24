
import IUser from '@entities/user.entity';

interface IUserRepository {
  create(user: IUser): Promise<IUser>;
  update(user: IUser): Promise<IUser>;
  delete(id: string): Promise<IUser>;
  
  find(id: string): Promise<IUser>;
  findAll(): Promise<IUser[]>;
  findByEmail(email: string): Promise<IUser>;
  
  signup(email: string, password: string): Promise<IUser>;
  signin(email: string, password: string): Promise<IUser>;
}

export default IUserRepository;
