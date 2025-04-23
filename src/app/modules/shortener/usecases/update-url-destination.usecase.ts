import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UrlRepository } from '../repositories/url.repository';
import { UpdateUrlDestinationDto } from '../dtos/update-url-destination.dto';

@Injectable()
export class UpdateUrlDestinationUseCase {
    constructor(
        @Inject('UrlRepository')
        private readonly urlRepository: UrlRepository,
    ) {}

    public async execute(request: UpdateUrlDestinationDto) {
        const urlEntity = await this.urlRepository.findOne({
            where: { uuid: request.urlUuid },
        });

        if (!urlEntity) {
            throw new NotFoundException('Not Found Shortened Url!');
        }

        urlEntity.setUrl(request.destination);
        await this.urlRepository.update(urlEntity);
    }
}
