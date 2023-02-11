import { ITag } from '@entities/tag.entity';
import BaseRepository, { IBaseRepository } from '@repositories/base.repository';
import { model, Schema } from 'mongoose';

export interface ITagRepository extends IBaseRepository<ITag> {
  findByName(name: string): Promise<ITag | undefined>;
}

const tagSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const TagModel = model<ITag>('Tag', tagSchema);

class TagRepository extends BaseRepository<ITag> implements ITagRepository {
  async findByName(name: string) {
    const tag = await TagModel.findOne({ name });
    return tag;
  }
}

export default TagRepository;