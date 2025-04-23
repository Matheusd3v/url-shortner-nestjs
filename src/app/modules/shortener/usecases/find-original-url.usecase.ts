import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IUrlShortenerRepository } from '../repositories/url-shortener.repository';

@Injectable()
export class FindOriginalUrlUseCase {
    constructor(
        @Inject('IUrlShortenerRepository')
        private readonly urlShortenerRepository: IUrlShortenerRepository,
    ) {}

    public async execute(code: string) {
        const shortener = await this.urlShortenerRepository.findOne({
            where: {
                code,
            },
        });

        if (!shortener) {
            throw new NotFoundException('Not Found Shortcode!');
        }

        shortener.setClicks(shortener.getClicks() + 1);

        await this.urlShortenerRepository.update(shortener);

        return { url: shortener.getUrl() };
    }
}
