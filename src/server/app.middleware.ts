import morgan from "morgan";
import { LOG_FORMAT } from "@/config";
import { logger, stream } from "@/shared/utils/logger";
import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { HttpException } from "@/shared/errors/http.error";

export const LoggerMiddleware = morgan(LOG_FORMAT, { stream });


export const errorHandler = (error: HttpException, req: Request, res: Response, next: NextFunction) => {
  try {
    const status: number = error.status || 500;
    const message: string = error.message || 'Something went wrong';

    logger.error(`[${req.method}] ${req.path} >> StatusCode:: ${status}, Message:: ${message}`);
    res.status(status).json({ message });
  } catch (error) {
    next(error);
  }
};