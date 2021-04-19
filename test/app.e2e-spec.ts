import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { v4 as uuidv4 } from 'uuid';
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { expect } from 'chai';

describe('User', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule.forRoot()],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/GET user`, () => {
    return request(app.getHttpServer())
      .get('/user/81b83657-e685-46c0-b8f0-6144f3686195/')
      .expect(200)
      .then((data) => {
        expect(data.status);
        expect(data.status).to.be.equal(200);
        expect(data.body).to.have.property('id');
        expect(data.body).to.have.property('version');
        expect(data.body).to.have.property('updatedAt');
        expect(data.body).to.have.property('createdAt');
        expect(data.body).to.have.property('first_name');
        expect(data.body).to.have.property('last_name');
        expect(data.body).to.have.property('email');
      })
      .catch((e) => {
        console.log(`e`, e);
      });
  });

  it(`/Create user`, () => {
    return request(app.getHttpServer())
      .post('/user')
      .send({
        first_name: 'shubham',
        last_name: 'soni',
        email: `demo${uuidv4()}@example.com`,
        password: '111',
      })
      .expect(201)
      .then((data) => {
        expect(data.body).to.have.property('identifiers');
        expect(data.body.identifiers[0]).to.have.property('id');
      })
      .catch((e) => {
        console.log(`e`, e);
      });
  });

  it(`/List ten users`, () => {
    return request(app.getHttpServer())
      .get('/user')
      .expect(200)
      .then((data) => {
        expect(data.body).to.be.an.instanceOf(Array);
      })
      .catch((e) => {
        console.log(`e`, e);
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
