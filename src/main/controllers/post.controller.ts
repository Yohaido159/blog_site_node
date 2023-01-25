// create Post controller for the user usecase

import { Request, Response } from 'express';

import CreateUseCase from '@usecases/create-post.usecase';
import BaseController from './base.controller';
import { IPost } from '../entities/post.entity';

class PostController extends BaseController<IPost> {
  constructor(protected useCase: CreateUseCase) {
    super(useCase);
  }

  async searchByTitle(req: Request, res: Response) {
    const { title } = req.body;
    const posts = await this.useCase.searchByTitle(title);
    res.json(posts);
  }

  async searchByContent(req: Request, res: Response) {
    const { content } = req.body;
    const posts = await this.useCase.searchByContent(content);
    res.json(posts);
  }

  async searchByAuthor(req: Request, res: Response) {
    const { author } = req.body;
    const posts = await this.useCase.searchByAuthor(author);
    res.json(posts);
  }

  async searchByTags(req: Request, res: Response) {
    const { tags } = req.body;
    const posts = await this.useCase.searchByTags(tags);
    res.json(posts);
  }

  async searchByCategories(req: Request, res: Response) {
    const { categories } = req.body;
    const posts = await this.useCase.searchByCategories(categories);
    res.json(posts);
  }

}

export default PostController;


