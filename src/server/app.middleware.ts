import express, { Application, NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import passport from 'passport';
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';

import { LOG_FORMAT, SECRET_KEY } from '@/config';
import { UserModel } from '@/main/repositories/user.repository';
import { HttpException } from '@/shared/errors/http.error';
import { logger, stream } from '@/shared/utils/logger';
import { swaggerMiddleware } from '@/shared/utils/swagger';

const initPassport = () => {
  const getUserAfterAuth = async (jwtPayload, done) => {
    const user = await UserModel.findById(jwtPayload.id);
    if (!user) {
      return done(null, false);
    }
    return done(null, user);
  };

  passport.use(
    new JwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: SECRET_KEY,
      },
      getUserAfterAuth,
    ),
  );
};

const errorHandler = (error: HttpException, req: Request, res: Response, next: NextFunction) => {
  try {
    const status: number = error.status || 500;
    const message: string = error.message || 'Something went wrong';

    logger.error(`[${req.method}] ${req.path} >> StatusCode:: ${status}, Message:: ${message}`);
    res.status(status).json({ message });
  } catch (error) {
    next(error);
  }
};

const loggerMiddleware = morgan(LOG_FORMAT, { stream });

export const registerMiddleware = (app: Application) => {
  initPassport();

  // app.use(loggerMiddleware);
  app.use(express.json());
  app.use(passport.initialize());
  app.use(...swaggerMiddleware);
  app.use(errorHandler);
};
