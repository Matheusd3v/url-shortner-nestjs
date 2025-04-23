import { Module } from '@nestjs/common';
import { BcryptRepository } from './hash/bcrypt.repository';

@Module({
    providers: [
        {
            provide: 'HashRepository',
            useClass: BcryptRepository,
        },
    ],
    exports: ['HashRepository'],
})
export class SecurityModule {}
