import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';

import { AppModule } from './../src/app.module.js';
import { App } from 'supertest/types.js';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('Courses API', () => {
    it('/courses (GET) should return an array of courses', async () => {
      const response = await request(app.getHttpServer())
        .get('/courses')
        .expect(200);

      expect(Array.isArray(response.body)).toBeTruthy();
    });
  });

  describe('Enrollments API', () => {
    const randomCpf = `111.222.333-${Math.floor(10 + Math.random() * 90)}`; // Generate random CPF to avoid state conflicts

    const enrollmentPayload = {
      name: 'E2E Test User',
      cpf: randomCpf,
      birthDate: '01/01/2000',
      email: 'e2e@test.com',
      phone: '(11) 99999-9999',
      graduationYear: '2018',
      terms: true,
      whatsapp: true,
    };

    it('/enrollments (POST) should create a new enrollment', async () => {
      const response = await request(app.getHttpServer())
        .post('/enrollments')
        .send(enrollmentPayload)
        .expect(201);

      expect(response.body).toHaveProperty('id');
      expect(response.body.cpf).toBe(randomCpf);
    });

    it('/enrollments (POST) should return 409 Conflict if CPF already exists', async () => {
     
      const response = await request(app.getHttpServer())
        .post('/enrollments')
        .send(enrollmentPayload)
        .expect(409); 

      expect(response.body.message).toBe('Já existe uma matrícula para este CPF!');
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
