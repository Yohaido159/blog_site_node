import express, { Router } from 'express';
import BaseController from '@/main/controllers/base.controller';
import { NextFunction, Request, Response } from 'express-serve-static-core';

function createBaseController<T>(controller: BaseController<T>) {
  const router = express.Router();

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
}

export default createBaseController;

// export const handleError = (fn: (req: Request, res: Response, next: NextFunction) => Promise<void>) => {
//   return (req: Request, res: Response, next: NextFunction) => {
//     fn(req, res, next).catch(next);
//   };
// }; 


// export const handleError = fn =>
// function asyncUtilWrap(...args) {
//   const fnReturn = fn(...args)
//   const next = args[args.length-1]
//   return Promise.resolve(fnReturn).catch(next)
// }

export const handleError = (fn: (...args: any[]) => Promise<any>) =>
  function asyncUtilWrap(...args: any[]): Promise<void> {
    const fnReturn = fn(...args);
    const next = args[args.length - 1];
    return Promise.resolve(fnReturn).catch(next);
  };

