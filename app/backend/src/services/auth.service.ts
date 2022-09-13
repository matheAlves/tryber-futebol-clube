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

  static async generateToken(email: string): Promise<string> {
    const token = jwt.sign(email, 'bigSecret');
    return token;
  }

  // async readToken(payload: Token) {
  //   try {
  //     const data = jwt.verify(payload.token, this.secret);
  //     return data;
  //   } catch (_err) {
  //     const e = new Error('Invalid token');
  //     e.name = 'InvalidCredentials';
  //     throw e;
  //   }
  // }
}
