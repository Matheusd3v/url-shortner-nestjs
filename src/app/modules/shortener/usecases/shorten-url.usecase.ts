import {
    Inject,
    Injectable,
    NotFoundException,
    ServiceUnavailableException,
} from '@nestjs/common';
import { IUrlShortenerRepository } from '../repositories/url-shortener.repository';
import { ShortenUrlRequestDto } from '../dtos/shorten-url-request.dto';
import { UrlShortenerTransformer } from '../transformer/url-shortener.transformer';
import { UrlShortenerEntity } from '../entities/url-shortener.entity';
import { ShortedUrlResponseDto } from '../dtos/shorted-url-response.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ShortenUrlUsecase {
    constructor(
        @Inject('IUrlShortenerRepository')
        private readonly urlShortenerRepository: IUrlShortenerRepository,
        private readonly config: ConfigService,
    ) {}

    public async execute(
        urlRequest: ShortenUrlRequestDto,
    ): Promise<ShortedUrlResponseDto> {
        const code = await this.generateShortCode();
        const urlShortenerEntity = await this.urlShortenerRepository.save(
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
            const shortCode = UrlShortenerEntity.generateShortCode();
            const existingUrl = await this.urlShortenerRepository.findOne({
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
