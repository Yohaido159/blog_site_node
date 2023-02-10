import morgan from "morgan";
import { LOG_FORMAT, SECRET_KEY } from "@/config";
import { logger, stream } from "@/shared/utils/logger";
import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { HttpException } from "@/shared/errors/http.error";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import { UserModel } from "@/main/repositories/user.repository";
import passport from "passport";

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

export const initPassport = () => {
  const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: SECRET_KEY,
  };

  const getUserAfterAuth = async (jwtPayload, done) => {
    const user = await UserModel.findById(jwtPayload.id);
    if (!user) {
      return done(null, false);
    }
    return done(null, user);
  };

  passport.use(new JwtStrategy(jwtOptions, getUserAfterAuth));
};