import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UrlRepository } from '../repositories/url.repository';
import { UserEntity } from '../../users/entities/user.entity';
import { UserUrlsResponseDto } from '../dtos/user-urls-response.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ListUserUrlsUseCase {
    constructor(
        @Inject('UrlRepository')
        private readonly urlRepository: UrlRepository,
        private readonly config: ConfigService,
    ) {}

    public async execute(user: UserEntity): Promise<UserUrlsResponseDto> {
        const urls = await this.urlRepository.findAll({
            where: { userId: user.getId() },
        });
        const apiDomain = this.config.get<string>('API_DOMAIN');

        if (!apiDomain) {
            throw new NotFoundException('Not found domain url!');
        }

        return {
            urls: urls.map((url) => {
                return {
                    id: url.getUuid(),
                    clicks: url.getClicks(),
                    createdAt: url.getCreatedAt(),
                    redirectUrl: url.getShortenedUrl(apiDomain),
                    url: url.getUrl(),
                };
            }),
        };
    }
}
