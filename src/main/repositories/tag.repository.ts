import { ITag } from '@entities/tag.entity';
import BaseRepository, { IBaseRepository } from '@repositories/base.repository';
import { model, Schema } from 'mongoose';

export interface ITagRepository extends IBaseRepository<ITag> {
  findByName(name: string): Promise<ITag | undefined>;
}

const TagSchema = new Schema({
  name: { type: String, required: true, unique: true },
});

const TagModel = model<ITag>('Tag', TagSchema);

class TagRepository extends BaseRepository<ITag> implements ITagRepository {
  async findByName(name: string) {
    const tag = await TagModel.findOne({ name });
    return tag;
  }
}

export default TagRepository;