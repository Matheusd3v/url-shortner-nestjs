import { UserRepository } from '@modules/users/repositories/user.repository';
import { UserEntity } from '@root/src/app/modules/users/entities/user.entity';
import { faker } from '@faker-js/faker';
import { HashRepository } from '@root/src/infra/security/hash/hash.repository';

interface UserFactoryData {
    password?: string;
    email?: string;
}

export class UserFactory {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly hashRepository: HashRepository,
    ) {}

    public async create({ email, password: secret }: UserFactoryData) {
        const user = new UserEntity();
        user.setEmail(email ?? faker.internet.email());
        const password = await this.hashRepository.hashPassword(
            secret ?? faker.string.alphanumeric(15),
        );
        user.setPassword(password);

        return this.userRepository.save(user);
    }
}
