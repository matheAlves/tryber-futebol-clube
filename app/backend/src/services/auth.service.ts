import Joi = require('joi');
import jwt = require('jsonwebtoken');
import bcrypt = require('bcryptjs');
import { Login } from '../interfaces';

export default class AuthService {
  static async validateLoginReqBody(body: Login): Promise<void> {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    });
    try {
      await schema.validateAsync(body);
    } catch (e) {
      const err = new Error('All fields must be filled');
      err.name = 'missingCredentials';
      throw err;
    }
  }

  static async checkPassword(password: string, hash: string): Promise<void> {
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

  static async readToken(token: string): Promise<Login> {
    const secret = process.env.JWT_SECRET || 'jwt_secret';
    try {
      const data = jwt.verify(token, secret);
      return data as Login;
    } catch (_err) {
      const e = new Error('Token must be a valid token');
      e.name = 'invalidCredentials';
      throw e;
    }
  }
}
