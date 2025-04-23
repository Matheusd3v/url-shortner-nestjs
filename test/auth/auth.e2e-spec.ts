import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../../src/app.module';
import { UserRepository } from '@modules/users/repositories/user.repository';
import { HashRepository } from '@infra/security/hash/hash.repository';
import { UserEntity } from '@root/src/app/modules/users/entities/user.entity';
import { UserFactory } from '../factory/user.factory';
import { randomUUID } from 'node:crypto';
import { faker } from '@faker-js/faker/.';

describe('Auth Integration Tests', () => {
    let app: INestApplication<App>;
    let userRepository: UserRepository;
    let hashRepository: HashRepository;
    let user: UserEntity;
    const password = randomUUID();

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();

        userRepository = app.get<UserRepository>('UserRepository');
        hashRepository = app.get<HashRepository>('HashRepository');

        user = await new UserFactory(userRepository, hashRepository).create({
            password,
        });
    });

    it('Should login user with success', async () => {
        const body = {
            email: user.getEmail(),
            password,
        };

        const response = await request(app.getHttpServer())
            .post('/auth')
            .send(body);

        expect(response.statusCode).toBe(HttpStatus.OK);
        expect(response.body).toHaveProperty('token');
        expect(response.body).toHaveProperty('uuid', user.getUuid());
    });

    it('Should throw error when try login with invalid credentials', async () => {
        const body = {
            email: user.getEmail(),
            password: faker.animal.horse(),
        };

        const response = await request(app.getHttpServer())
            .post('/auth')
            .send(body);

        expect(response.statusCode).toBe(HttpStatus.BAD_REQUEST);
    });
});
