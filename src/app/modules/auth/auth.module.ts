import { forwardRef, Module } from '@nestjs/common';
import { GenerateAccessTokenUseCase } from './usecases/generate-acces-token.usecase';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';
import { UserModule } from '../users/user.module';
import { LoginUseCase } from './usecases/login.usecase';
import { SecurityModule } from '@root/src/infra/security/security.module';
import { AuthController } from './controllers/auth.controller';

@Module({
    imports: [
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: (config: ConfigService) => ({
                secret: config.get<string>('JWT_SECRET'),
            }),
            inject: [ConfigService],
        }),
        forwardRef(() => UserModule),
        SecurityModule,
    ],
    controllers: [AuthController],
    providers: [GenerateAccessTokenUseCase, JwtStrategy, LoginUseCase],
    exports: [GenerateAccessTokenUseCase],
})
export class AuthModule {}
