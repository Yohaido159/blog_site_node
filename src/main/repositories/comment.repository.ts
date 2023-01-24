
import IComment from '@entities/comment.entity';

interface ICommentRepository {
    create(comment: IComment): Promise<IComment>;
    update(comment: IComment): Promise<IComment>;
    delete(id: string): Promise<IComment>;
    find(id: string): Promise<IComment>;
    findAll(): Promise<IComment[]>;

    findByPost(post: string): Promise<IComment[]>;
    findByAuthor(author: string): Promise<IComment[]>;
}

export default ICommentRepository;