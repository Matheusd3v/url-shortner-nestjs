import { Module } from '@nestjs/common';
import { UrlShortenerController } from './controllers/url-shortener.controller';
import { ShortenUrlUsecase } from './usecases/shorten-url.usecase';
import { FindOriginalUrlUseCase } from './usecases/find-original-url.usecase';
import { UrlPostgresqlRepository } from '@infra/database/sql/prisma/repository/url-repository';

@Module({
    controllers: [UrlShortenerController],
    providers: [
        {
            provide: 'UrlRepository',
            useClass: UrlPostgresqlRepository,
        },
        ShortenUrlUsecase,
        FindOriginalUrlUseCase,
    ],
})
export class ShortenerModule {}
