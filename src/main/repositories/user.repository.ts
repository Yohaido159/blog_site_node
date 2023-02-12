import { IUser } from '@entities/user.entity';
import BaseRepository, { IBaseRepository } from '@repositories/base.repository';
import { model, Schema } from 'mongoose';

type CreateEntity = {
  name: string;
  email: string;
  password: string;
};

export interface IUserRepository extends IBaseRepository<IUser> {
  create(entity: CreateEntity): Promise<IUser>;
  findByEmail(email: string): Promise<IUser>;
}

const userSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

export const UserModel = model<IUser>('User', userSchema);

class UserRepository extends BaseRepository<IUser> implements IUserRepository {
  async create(entity: CreateEntity) {
    const user = await UserModel.create(entity);
    return user;
  }

  async findByEmail(email: string) {
    const user = await UserModel.findOne({ email });
    return user;
  }
}

export default UserRepository;
