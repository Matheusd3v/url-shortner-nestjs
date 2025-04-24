import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { ShortenerModule } from './app/modules/shortener/shortener.module';
import { ClsPluginTransactional } from '@nestjs-cls/transactional';
import { ClsModule } from 'nestjs-cls';
import { PrismaModule } from './infra/database/sql/prisma/prisma.module';
import { TransactionalAdapterPrisma } from '@nestjs-cls/transactional-adapter-prisma';
import { PrismaPGService } from './infra/database/sql/prisma/prisma-pg.service';
import { SecurityModule } from './infra/security/security.module';
import { UserModule } from './app/modules/users/user.module';
import { AuthModule } from './app/modules/auth/auth.module';
import { LoggerMiddleware } from './infra/opentelemetry/logger.middleware';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: './.env',
        }),
        ClsModule.forRoot({
            plugins: [
                new ClsPluginTransactional({
                    imports: [PrismaModule],
                    adapter: new TransactionalAdapterPrisma({
                        prismaInjectionToken: PrismaPGService,
                    }),
                }),
            ],
        }),
        ShortenerModule,
        SecurityModule,
        UserModule,
        AuthModule,
    ],
    controllers: [AppController],
    providers: [],
})
export class AppModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddleware).forRoutes('*');
    }
}
