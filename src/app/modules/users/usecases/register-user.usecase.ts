import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { RegisterUserRequestDto } from '../dtos/register-user-request.dto';
import { UserEntity } from '../entities/user.entity';
import { HashRepository } from '@infra/security/hash/hash.repository';

@Injectable()
export class RegisterUserUseCase {
    constructor(
        @Inject('UserRepository')
        private readonly userRepository: UserRepository,
        @Inject('HashRepository')
        private readonly hashRepository: HashRepository,
    ) {}

    public async execute(request: RegisterUserRequestDto) {
        const alreadyExists = await this.userRepository.findOne({
            where: { email: request.email },
        });

        if (alreadyExists) {
            throw new ConflictException('User Already Exists!');
        }

        request.password = await this.hashRepository.hashPassword(
            request.password,
        );

        const user = new UserEntity();
        user.setEmail(request.email);
        user.setPassword(request.password);

        return this.userRepository.save(user);
    }
}
