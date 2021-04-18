import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { v4 as uuidv4 } from 'uuid';
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
//import { expect } from 'chai';

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
        expect(data.status).toEqual(200);
        expect(data.body).toHaveProperty('id');
        expect(data.body).toHaveProperty('version');
        expect(data.body).toHaveProperty('updatedAt');
        expect(data.body).toHaveProperty('createdAt');
        expect(data.body).toHaveProperty('first_name');
        expect(data.body).toHaveProperty('last_name');
        expect(data.body).toHaveProperty('email');
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
        //console.log(`data.body`, data.body);
      })
      .catch((e) => {
        console.log(`e`, e);
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
