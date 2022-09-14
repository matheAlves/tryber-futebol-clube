import Joi = require('joi');
import jwt = require('jsonwebtoken');
import bcrypt = require('bcryptjs');
import { Login } from '../interfaces';

export default class AuthService {
  // method not in use since requirements asked for specific error messages different from Joi's, so req body is being verified in controller and throwing a custom error.
  static async validateLoginReqBody(body: Login): Promise<void> {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    });

    await schema.validateAsync(body);
  }

  static async checkPassword(password: string, hash: string) {
    await bcrypt.compare(password, hash).then((passwordCheck) => {
      if (passwordCheck === false) {
        const e = new Error('Incorrect email or password');
        e.name = 'invalidCredentials';
        throw e;
      }
    });
  }

  static async generateToken(user: Login): Promise<string> {
    const secret = process.env.JWT_SECRET || 'jwt_secret';
    const token = jwt.sign(user, secret);
    return token;
  }

  static async readToken(token: string) {
    const secret = process.env.JWT_SECRET || 'jwt_secret';
    try {
      const data = jwt.verify(token, secret);
      return data;
    } catch (_err) {
      const e = new Error('Invalid token');
      e.name = 'InvalidCredentials';
      throw e;
    }
  }
}
