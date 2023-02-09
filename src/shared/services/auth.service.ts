import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';

import { SECRET_KEY } from '@/config';

export class PasswordHasher {
  static async hash(password: string): Promise<string> {
    // Use a library such as bcrypt to hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  }

  static async compare(password: string, hashedPassword: string): Promise<boolean> {
    // Use bcrypt to compare the plain text password with the hashed password
    return bcrypt.compare(password, hashedPassword);
  }
}

export class JWTGenerator {
  static generate(payload: object): string {
    const secret = SECRET_KEY;
    const options = { expiresIn: '2h' };
    const token = jsonwebtoken.sign(payload, secret, options);
    return token;
  }
}
