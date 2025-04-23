import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UrlRepository } from '../repositories/url.repository';

@Injectable()
export class FindOriginalUrlUseCase {
    constructor(
        @Inject('UrlRepository')
        private readonly urlRepository: UrlRepository,
    ) {}

    public async execute(code: string) {
        const shortener = await this.urlRepository.findOne({
            where: {
                code,
            },
        });

        if (!shortener) {
            throw new NotFoundException('Not Found Shortcode!');
        }

        shortener.setClicks(shortener.getClicks() + 1);

        await this.urlRepository.update(shortener);

        return { url: shortener.getUrl() };
    }
}
