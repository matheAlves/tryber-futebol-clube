import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import AuthService from '../services/auth.service';
import { app } from '../app';
import { Response } from 'superagent';
import UserService from '../services/user.service';
import loginMock from './mocks/login.mock';
import UserModel from '../database/models/user.model';
import bcrypt = require('bcryptjs');

chai.use(chaiHttp);

const { expect } = chai;

describe('Request with POST method on /login', () => {

  describe('when login information is valid', () => {
    beforeEach(() => {
      sinon.stub(AuthService, 'validateLoginReqBody').resolves();
      sinon.stub(UserModel, 'findOne').resolves({ password: 'pretendthisisahash'} as UserModel)
      sinon.stub(AuthService, 'checkPassword').resolves()
      sinon.stub(AuthService, 'generateToken').resolves('pretendthisisatoken')
    })
    afterEach(sinon.restore)
    it('should return a 200 status', async () => {
      const response = await chai.request(app).post('/login').send(loginMock)
      expect(response.status).to.equal(200);
    });
    it('should return a token', async () => {
      const response = await chai.request(app).post('/login').send(loginMock)
      expect(response.body.token).to.equal('pretendthisisatoken')
    })
  });

  describe(`when 'email' is invalid`, () => {
    beforeEach(() => {
      sinon.stub(AuthService, 'validateLoginReqBody').resolves();
      sinon.stub(UserModel, 'findOne').resolves(null)
    })
    afterEach(sinon.restore)
    it('should return a 400 status', async () => {
    const response = await chai.request(app).post('/login').send(loginMock)
    expect(response.status).to.equal(401)
    })
  })

  describe(`when 'password' is invalid`, () => {
    beforeEach(() => {
      sinon.stub(AuthService, 'validateLoginReqBody').resolves();
      sinon.stub(UserService, 'checkEmailExists').resolves('pretendthisisahash')
      sinon.stub(bcrypt, 'compare').resolves(false)
    })
    afterEach(sinon.restore)
    it('should return a 401 status', async () => {
    const response = await chai.request(app).post('/login').send(loginMock)
    expect(response.status).to.equal(401)
    })
  })

  describe('when login information is missing', () => {
    it('should return a 400 status', async () => {
      const response = await chai.request(app).post('/login').send({})
      expect(response.status).to.equal(400)
    })
    it(`should return a 'All fields must be filled' message`, async () => {
      const response = await chai.request(app).post('/login').send({})
      expect(response.body.message).to.deep.equal('All fields must be filled')
    })
  })  
})

describe('Request with GET method on /login/validate', () => {
  beforeEach(() => {
    sinon.stub(AuthService, 'readToken').resolves(loginMock);
    sinon.stub(UserService, 'getRoleByEmail').resolves('admin');
  })
  afterEach(sinon.restore)
  describe('when authorized', () => {
    it('should return user role', async () => {
      const response = await chai
        .request(app)
        .get('/login/validate')
        .set({'Authorization': 'pretendthisisatoken'})
        expect(response.body.role).to.equal('admin')
    })
  })
})