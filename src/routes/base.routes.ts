import { Router } from 'express';
import BaseController from '@/main/controllers/base.controller';

export const createBaseRouter = <T>(controller: BaseController<T>) => {
  const router = Router();

  router.get(
    '/',
    handleError((req, res) => controller.findAll(req, res)),
  );

  router.get(
    '/:id',
    handleError((req, res) => controller.findById(req, res)),
  );
  router.post(
    '/',
    handleError((req, res) => controller.create(req, res)),
  );
  router.put(
    '/:id',
    handleError((req, res) => controller.update(req, res)),
  );
  router.delete(
    '/:id',
    handleError((req, res) => controller.delete(req, res)),
  );

  return router;
};


export const handleError = (fn: (...args: any[]) => Promise<void>) => {
  return function asyncUtilWrap(...args: any[]): Promise<void> {
    const fnReturn = fn(...args);
    const next = args[args.length - 1];
    return Promise.resolve(fnReturn).catch(next);
  };
};
