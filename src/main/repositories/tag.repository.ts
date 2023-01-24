
import ITag from '@entities/tag.entity';

interface ITagRepository {
    create(tag: ITag): Promise<ITag>;
    update(tag: ITag): Promise<ITag>;
    delete(id: string): Promise<ITag>;
    find(id: string): Promise<ITag>;
    findAll(): Promise<ITag[]>;
    findByName(name: string): Promise<ITag>;
}

export default ITagRepository;