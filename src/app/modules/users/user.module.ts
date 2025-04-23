import { forwardRef, Module } from '@nestjs/common';
import { UserPostgresRepository } from '@infra/database/sql/prisma/repository/user.repository';
import { SecurityModule } from '@infra/security/security.module';
import { UserController } from './controllers/user.controller';
import { RegisterUserUseCase } from './usecases/register-user.usecase';
import { AuthModule } from '../auth/auth.module';

@Module({
    imports: [SecurityModule, forwardRef(() => AuthModule)],
    controllers: [UserController],
    providers: [
        {
            provide: 'UserRepository',
            useClass: UserPostgresRepository,
        },
        RegisterUserUseCase,
    ],
    exports: ['UserRepository'],
})
export class UserModule {}
