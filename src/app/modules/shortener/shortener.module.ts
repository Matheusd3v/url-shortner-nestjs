import { Module } from '@nestjs/common';
import { UrlShortenerController } from './controllers/url-shortener.controller';
import { ShortenUrlUsecase } from './usecases/shorten-url.usecase';
import { FindOriginalUrlUseCase } from './usecases/find-original-url.usecase';
import { UrlPostgresqlRepository } from '@infra/database/sql/prisma/repository/url-repository';
import { ListUserUrlsUseCase } from './usecases/list-user-urls.usecase';
import { UrlController } from './controllers/url.controller';
import { SoftDeleteUserUrlUseCase } from './usecases/soft-delete-user-url.usecase';
import { UpdateUrlDestinationUseCase } from './usecases/update-url-destination.usecase';

@Module({
    controllers: [UrlShortenerController, UrlController],
    providers: [
        {
            provide: 'UrlRepository',
            useClass: UrlPostgresqlRepository,
        },
        ShortenUrlUsecase,
        FindOriginalUrlUseCase,
        ListUserUrlsUseCase,
        SoftDeleteUserUrlUseCase,
        UpdateUrlDestinationUseCase,
    ],
})
export class ShortenerModule {}
