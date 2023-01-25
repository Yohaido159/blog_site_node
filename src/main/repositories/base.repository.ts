interface IBaseRepository<T> {
  findAll(): Promise<T[]>;
  findById(id: string): Promise<T | undefined>;
  create(entity: T): Promise<T>;
  update(id: string, entity: T): Promise<T>;
  delete(id: string): Promise<T>;
}

export { IBaseRepository };

class BaseRepository<T> implements IBaseRepository<T> {
  private model: any;

  constructor(schemaModel: any) {
    this.model = schemaModel;
  }

  async findAll() {
    const entities = await this.model.find();
    return entities;
  }

  async findById(id: string) {
    const entity = await this.model.findById;
    return entity;
  }

  async create(entity: T) {
    const newEntity = await this.model.create(entity);
    return newEntity;
  }

  async update(id: string, entity: T) {
    const updatedEntity = await this.model;
    return updatedEntity;
  }

  async delete(id: string) {
    const deletedEntity = await this.model;
    return deletedEntity;
  }
}

export default BaseRepository;
  