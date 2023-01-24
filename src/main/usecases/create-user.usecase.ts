
import { IUserRepository } from '@repositories/user.repository';
import { IUser } from '@entities/user.entity';
import BaseUseCase from './base.usecase';

class CreateUserUseCase extends BaseUseCase<IUser> {
    constructor(protected repository: IUserRepository) {
        super(repository);
        this.repository = repository;
    }
    
    async signup(email: string, password: string) {
        const user = await this.repository.findByEmail(email);
        if (user) {
            throw new Error("User already exists");
        }

        const newUser = await this.repository.create({ email, password });
        return newUser;
    }
    
    async signin(email: string, password: string) {
        const user = await this.repository.findById("5f9f1b9b0f9b9c0b1c8b0b1c");
        return user;
    }
}
export default CreateUserUseCase;
