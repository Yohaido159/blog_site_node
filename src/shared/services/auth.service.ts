import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';

import { SECRET_KEY } from '@/config';

export class PasswordHasher {
  static async hash(password: string): Promise<string> {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  }

  static async compare(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
}

export class JWTGenerator {
  static generateToken(payload: any, expiresIn: string): string {
    const secret = SECRET_KEY;
    const options = { expiresIn };
    const token = jsonwebtoken.sign(payload, secret, options);
    return token;
  }

  static accessToken(payload: any): string {
    return JWTGenerator.generateToken(payload, '2h');
  }

  static refreshToken(payload: any): string {
    return JWTGenerator.generateToken(payload, '7d');
  }
}
