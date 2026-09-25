import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import request from 'supertest';
import { AppModule } from './../src/app.module.js';
import { TransformInterceptor } from './../src/common/interceptors/transform.interceptor.js';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication({ bodyParser: false });
    app.useGlobalInterceptors(new TransformInterceptor(app.get(Reflector)));
    await app.init();
  });

  it('serves the public root route using the API response envelope', () => {
    return request(app.getHttpServer()).get('/').expect(200).expect({
      statusCode: 200,
      message: 'Success',
      data: 'Hello World!',
    });
  });

  it('serves the public hackathon list', () => {
    return request(app.getHttpServer())
      .get('/hackathon')
      .expect(200)
      .expect(({ body }) => {
        expect(body.statusCode).toBe(200);
        expect(Array.isArray(body.data)).toBe(true);
      });
  });

  it('requires authentication for user routes', () => {
    return request(app.getHttpServer()).get('/user').expect(401);
  });

  afterEach(async () => {
    await app.close();
  });
});
