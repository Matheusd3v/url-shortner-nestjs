import {
    Inject,
    Injectable,
    NotFoundException,
    ServiceUnavailableException,
} from '@nestjs/common';
import { UrlRepository } from '../repositories/url.repository';
import { ShortenUrlRequestDto } from '../dtos/shorten-url-request.dto';
import { UrlShortenerTransformer } from '../transformer/url-shortener.transformer';
import { UrlEntity } from '../entities/url-shortener.entity';
import { ShortedUrlResponseDto } from '../dtos/shorted-url-response.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ShortenUrlUsecase {
    constructor(
        @Inject('UrlRepository')
        private readonly urlRepository: UrlRepository,
        private readonly config: ConfigService,
    ) {}

    public async execute(
        urlRequest: ShortenUrlRequestDto,
    ): Promise<ShortedUrlResponseDto> {
        const code = await this.generateShortCode();
        const urlShortenerEntity = await this.urlRepository.save(
            UrlShortenerTransformer.toEntity({
                ...urlRequest,
                code,
            }),
        );
        const apiDomain = this.config.get<string>('API_DOMAIN');

        if (!apiDomain) {
            throw new NotFoundException('Not found domain url!');
        }

        return { urlShortened: urlShortenerEntity.getShortenedUrl(apiDomain) };
    }

    private async generateShortCode(): Promise<string> {
        const maxAttempts = 10;
        let attempts = 0;

        while (attempts < maxAttempts) {
            const shortCode = UrlEntity.generateShortCode();
            const existingUrl = await this.urlRepository.findOne({
                where: {
                    code: shortCode,
                },
            });

            if (!existingUrl) {
                return shortCode;
            }

            attempts++;
        }

        throw new ServiceUnavailableException(
            `Failed to generate unique short code, try again!`,
        );
    }
}
