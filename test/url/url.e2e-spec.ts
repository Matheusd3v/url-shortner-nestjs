import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../../src/app.module';
import { UrlRepository } from '@modules/shortener/repositories/url.repository';

describe('Url Shortener Integration Tests', () => {
    let app: INestApplication<App>;
    let urlRepository: UrlRepository;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();

        urlRepository = app.get<UrlRepository>('UrlRepository');
    });

    it('Should return a shortened url and status 201 CREATED', async () => {
        const body = {
            url: 'https://google.com',
        };

        const response = await request(app.getHttpServer())
            .post('/shorten')
            .send(body);

        expect(response.statusCode).toBe(HttpStatus.CREATED);
        expect(response.body).toHaveProperty('urlShortened');

        const urlEntity = await urlRepository.findOne({
            where: {
                code: response.body.urlShortened.split('/').at(-1),
            },
        });

        expect(urlEntity).toBeTruthy();
        expect(urlEntity?.getUrl()).toBe(body.url);
    });

    it('Should redirect a shortened url when access it', async () => {
        const body = {
            url: 'https://google.com',
        };

        const shortenResponse = await request(app.getHttpServer())
            .post('/shorten')
            .send(body);

        const code = shortenResponse.body.urlShortened.split('/').at(-1);

        const redirectResponse = await request(app.getHttpServer())
            .get(`/${code}`)
            .expect(HttpStatus.MOVED_PERMANENTLY);

        expect(redirectResponse.header.location).toBe(body.url);
    });
});
