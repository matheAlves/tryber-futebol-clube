// import jwt = require('jsonwebtoken');
import UserModel from '../database/models/user.model';

export default class UserService {
  static async checkEmailExists(reqEmail: string) {
    const result = await UserModel.findOne({
      where: { email: reqEmail },
      raw: true,
    });
    if (result) return result.password;

    const e = new Error('Incorrect email or password');
    e.name = 'invalidCredentials';
    throw e;
  }
}