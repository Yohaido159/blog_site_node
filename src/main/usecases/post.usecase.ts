// post usecase

import { IPostRepository } from '@repositories/post.repository';
import { IPost } from '@entities/post.entity';
import BaseUseCase from './base.usecase';

class PostUseCase extends BaseUseCase<IPost> {
  constructor(protected repository: IPostRepository) {
    super(repository);
    this.repository = repository;
  }

  async searchByTitle(title: string) {
    const posts = await this.repository.searchByTitle(title);
    return posts;
  }

  async searchByContent(content: string) {
    const posts = await this.repository.searchByContent(content);
    return posts;
  }

  async searchByAuthor(author: string) {
    const posts = await this.repository.searchByAuthor(author);
    return posts;
  }

  async searchByTags(tags: string[]) {
    const posts = await this.repository.searchByTags(tags);
    return posts;
  }

  async searchByCategories(categories: string[]) {
    const posts = await this.repository.searchByCategories(categories);
    return posts;
  }
}

export default PostUseCase;
