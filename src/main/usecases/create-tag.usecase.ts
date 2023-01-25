// tag usecase


import { ITagRepository } from '@repositories/tag.repository';
import { ITag } from '@entities/tag.entity';
import BaseUseCase from './base.usecase';

class TagUseCase extends BaseUseCase<ITag> {
  constructor(protected repository: ITagRepository) {
    super(repository);
    this.repository = repository;
  }

  async findByName(name: string) {
    const tag = await this.repository.findByName(name);
    return tag;
  }
}

export default TagUseCase;