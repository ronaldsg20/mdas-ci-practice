import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  describe('Root endpoint', () => {
    it('/ (GET) should return 200 and Hello World', () => {
      return request(app.getHttpServer())
        .get('/')
        .expect(200)
        .expect('Hello World!');
    });

    it('/ (GET) should return correct content type', () => {
      return request(app.getHttpServer())
        .get('/')
        .expect('Content-Type', /text\/html/);
    });

    it('/ (GET) should respond within 500ms', async () => {
      const start = Date.now();
      await request(app.getHttpServer()).get('/').expect(200);
      const duration = Date.now() - start;
      expect(duration).toBeLessThan(500);
    });
  });

  describe('Error handling', () => {
    it('should return 404 for non-existent routes', () => {
      return request(app.getHttpServer())
        .get('/non-existent-route')
        .expect(404);
    });

    it('should handle invalid HTTP methods gracefully', () => {
      return request(app.getHttpServer())
        .post('/')
        .expect(404); // NestJS returns 404 for unsupported methods on root
    });
  });

  describe('Application health', () => {
    it('should start successfully', () => {
      expect(app).toBeDefined();
    });

    it('should handle multiple concurrent requests', async () => {
      const requests = Array(10)
        .fill(null)
        .map(() => request(app.getHttpServer()).get('/').expect(200));

      await Promise.all(requests);
    });
  });

  describe('Response validation', () => {
    it('should not leak sensitive headers', async () => {
      const response = await request(app.getHttpServer()).get('/');

      expect(response.headers['x-powered-by']).toBeUndefined();
      expect(response.headers['server']).toBeDefined();
    });

    it('should return valid response body', async () => {
      const response = await request(app.getHttpServer())
        .get('/')
        .expect(200);

      expect(response.text).toBe('Hello World!');
      expect(response.text.length).toBeGreaterThan(0);
    });
  });
});
