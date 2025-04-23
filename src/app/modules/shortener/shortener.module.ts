import { Module } from '@nestjs/common';
import { UrlShortenerInMemoryRepository } from '@infra/database/in-memory/url-shortener-in-memory.repository';
import { UrlShortenerController } from './controllers/url-shortener.controller';
import { ShortenUrlUsecase } from './usecases/shorten-url.usecase';

@Module({
    controllers: [UrlShortenerController],
    providers: [
        {
            provide: 'IUrlShortenerRepository',
            useClass: UrlShortenerInMemoryRepository,
        },
        ShortenUrlUsecase,
    ],
})
export class ShortenerModule {}
