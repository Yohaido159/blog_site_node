import { Request, Response } from 'express';
import UserController from '@/main/controllers/user.controller';
import CreateUseCase from '@/main/usecases/user.usecase';
import { IUser } from '@/main/entities/user.entity';
import UserRepository from '@/main/repositories/user.repository';

type CreateEntity = {
  name: string;
  email: string;
  password: string;
};

class FakeUserRepository {
  async create(userData: CreateEntity): Promise<IUser> {
    return Promise.resolve({
      _id: Math.random().toString(36).substring(2, 9),
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123123123Ido',
    });
  }

  async findByEmail(email: string): Promise<IUser> {
    return null;
  }
}

describe('UserController', () => {
  let controller: UserController;
  let useCase: CreateUseCase;
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    const repository = new FakeUserRepository() as UserRepository;
    useCase = new CreateUseCase(repository);
    controller = new UserController(useCase);
    req = {
      body: {
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: '123123123Ido',
      },
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  describe('signup', () => {
    it('responds with the user returned by the use case', async () => {
      await controller.signup(req as Request, res as Response);
      expect(res.json).toHaveBeenCalledWith({
        user: {
          _id: expect.any(String),
          name: 'John Doe',
          email: 'johndoe@example.com',
          password: '123123123Ido',
        },
        tokens: {
          accessToken: expect.any(String),
          refreshToken: expect.any(String),
        },
      });
    });

    it('throws an error if any of the required fields are missing', async () => {
      req.body = {};
      const msgError = 'Missing required fields: name\nemail\npassword';
      try {
        await controller.signup(req as Request, res as Response);
      } catch (error) {
        expect(error.message).toBe(msgError);
        expect(error.status).toBe(400);
      }
    });
  });
});
