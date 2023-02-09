import { IUser } from '@entities/user.entity';
import BaseRepository, { IBaseRepository } from '@repositories/base.repository';
import { model, Schema } from 'mongoose';

export interface IUserRepository extends IBaseRepository<IUser> {
  create(entity: { name: string; email: string; password: string }): Promise<IUser>;
  findByEmail(email: string): Promise<IUser>;
}

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  __v: { type: Number, select: false },
});

export const UserModel = model<IUser>('User', UserSchema);

class UserRepository extends BaseRepository<IUser> implements IUserRepository {
  async create(entity: { name: string; email: string; password: string }) {
    const user = await UserModel.create(entity);
    return user;
  }

  async findByEmail(email: string) {
    const user = await UserModel.findOne({ email });
    return user;
  }
}

export default UserRepository;
