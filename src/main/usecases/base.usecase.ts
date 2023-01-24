
import { IBaseRepository } from '@repositories/base.repository';

class BaseUseCase<T> {
  protected repository: IBaseRepository<T>;

  constructor(repository: IBaseRepository<T>) {
    this.repository = repository;
  }

  async findAll() {
    const entities = await this.repository.findAll();
    return entities;
  }

  async findById(id: string) {
    const entity = await this.repository.findById(id);
    return entity;
  }

  async create(entity: any) {
    const newEntity = await this.repository.create(entity);
    return newEntity;
  }

  async update(id: string, entity: any) {
    const updatedEntity = await this.repository.update(id, entity);
    return updatedEntity;
  }

  async delete(id: string) {
    const deletedEntity = await this.repository.delete(id);
    return deletedEntity;
  }
}

export default BaseUseCase;
