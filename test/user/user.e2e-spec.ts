import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../../src/app.module';
import { UserRepository } from '@modules/users/repositories/user.repository';
import { RegisterUserRequestDto } from '@root/src/app/modules/users/dtos/register-user-request.dto';
import { randomUUID } from 'node:crypto';

describe('User Integration Tests', () => {
    let app: INestApplication<App>;
    let userRepository: UserRepository;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();

        userRepository = app.get<UserRepository>('UserRepository');
    });

    it('Should register a new user with status 201 CREATED', async () => {
        const body: RegisterUserRequestDto = {
            email: 'john.doe@mail.com',
            password: randomUUID(),
        };

        const response = await request(app.getHttpServer())
            .post('/users')
            .send(body);

        expect(response.statusCode).toBe(HttpStatus.CREATED);
        expect(response.body).toHaveProperty('token');
        expect(response.body).toHaveProperty('uuid');

        const user = await userRepository.findOne({
            where: { email: body.email },
        });

        expect(user).toBeTruthy();
        expect(user?.getEmail()).toBe(body.email);
        expect(user?.getPassword()).not.toBe(body.password);
        expect(user?.getUuid()).toBe(response.body.uuid);
    });

    it('Should throws CONFLICT ERROR when try register same email', async () => {
        const body: RegisterUserRequestDto = {
            email: 'john.doe@mail.com',
            password: randomUUID(),
        };

        const response = await request(app.getHttpServer())
            .post('/users')
            .send(body);

        expect(response.statusCode).toBe(HttpStatus.CONFLICT);
        expect(response.body).toHaveProperty('message', 'User Already Exists!');
    });
});
