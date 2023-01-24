
import { ITag } from '@entities/tag.entity';
import { IBaseRepository } from '@repositories/base.repository';

interface ITagRepository extends IBaseRepository<ITag> {
    findByName(name: string): Promise<ITag>;
}

export { ITagRepository };