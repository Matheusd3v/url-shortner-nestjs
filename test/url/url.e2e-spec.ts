import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../../src/app.module';
import { UrlRepository } from '@modules/shortener/repositories/url.repository';
import { UserRepository } from '@modules/users/repositories/user.repository';
import { HashRepository } from '@infra/security/hash/hash.repository';
import { UserEntity } from '@root/src/app/modules/users/entities/user.entity';
import { UserFactory } from '../factory/user.factory';
import { GenerateAccessTokenUseCase } from '@root/src/app/modules/auth/usecases/generate-acces-token.usecase';
import { UrlFactory } from '../factory/url.factory';

describe('Url Shortener Integration Tests', () => {
    let app: INestApplication<App>;
    let urlRepository: UrlRepository;
    let userRepository: UserRepository;
    let hashRepository: HashRepository;
    let generateAccessTokenUseCase: GenerateAccessTokenUseCase;
    let user: UserEntity;
    let token: string;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();

        urlRepository = app.get<UrlRepository>('UrlRepository');
        userRepository = app.get<UserRepository>('UserRepository');
        hashRepository = app.get<HashRepository>('HashRepository');
        generateAccessTokenUseCase = app.get(GenerateAccessTokenUseCase);

        user = await new UserFactory(userRepository, hashRepository).create({});
        token = await generateAccessTokenUseCase.execute({
            userUuid: user.getUuid(),
        });
        await new UrlFactory(urlRepository).bulkCreate({
            userId: user.getId(),
        });
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

    it('Should list all user urls with success', async () => {
        const response = await request(app.getHttpServer())
            .get(`/users/${user.getUuid()}/urls`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.statusCode).toBe(HttpStatus.OK);
        expect(response.body).toHaveProperty('urls');
        expect(response.body.urls.length).toBe(10);
    });
});
