import { Inject, Injectable } from '@nestjs/common';
import { UrlRepository } from '../repositories/url.repository';

@Injectable()
export class SoftDeleteUserUrlUseCase {
    constructor(
        @Inject('UrlRepository')
        private readonly urlRepository: UrlRepository,
    ) {}

    public async execute(urlUuid: string) {
        const url = await this.urlRepository.findOne({
            where: { uuid: urlUuid },
        });
        if (!url) return;

        url.setDeletedAt(new Date());

        await this.urlRepository.update(url);
    }
}
