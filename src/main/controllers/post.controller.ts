
import { IPostRepository } from '@repositories/post.repository';
import BaseController from './base.controller';

class PostController extends BaseController {
  private postRepository: IPostRepository;

  constructor(postRepository: IPostRepository) {
    super(postRepository);
    this.postRepository = postRepository;
  }

  async searchByTitle(title: string) {
    const posts = await this.postRepository.searchByTitle(title);
    return posts;
  }

  async searchByContent(content: string) {
    const posts = await this.postRepository.searchByContent(content);
    return posts;
  }

  async searchByAuthor(author: string) {
    const posts = await this.postRepository.searchByAuthor(author);
    return posts;
  }

  async searchByTags(tags: string[]) {
    const posts = await this.postRepository.searchByTags(tags);
    return posts;
  }

  async searchByCategories(categories: string[]) {
    const posts = await this.postRepository.searchByCategories(categories);
    return posts;
  }
}

export default PostController;