import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '../../users/repositories/user.repository';
import { HashRepository } from '@infra/security/hash/hash.repository';
import { LoginRequestDto } from '../dtos/login-request';

@Injectable()
export class LoginUseCase {
    constructor(
        @Inject('UserRepository')
        private readonly userRepository: UserRepository,
        @Inject('HashRepository')
        private readonly hashRepository: HashRepository,
    ) {}

    public async execute(loginBody: LoginRequestDto) {
        const user = await this.userRepository.findOne({
            where: { email: loginBody.email },
        });

        if (!user) {
            throw new BadRequestException('Invalid Credentials!');
        }

        await this.validatePassword(loginBody.password, user.getPassword());

        return user;
    }

    private async validatePassword(plain: string, hashed: string) {
        const valid = await this.hashRepository.comparePasswords(plain, hashed);

        if (!valid) {
            throw new BadRequestException('Invalid Credentials!');
        }
    }
}
