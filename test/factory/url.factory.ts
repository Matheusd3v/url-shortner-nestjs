import { faker } from '@faker-js/faker/.';
import { UrlRepository } from '@modules/shortener/repositories/url.repository';
import { UrlEntity } from '@modules/shortener/entities/url-shortener.entity';

interface UrlFactoryData {
    userId?: number;
    url?: string;
    code?: string;
}

export class UrlFactory {
    constructor(private readonly urlRepository: UrlRepository) {}

    public async create(data: UrlFactoryData) {
        const mock = this.generateMock(data);
        return this.urlRepository.save(mock);
    }

    public async bulkCreate(data: UrlFactoryData, quantity = 10) {
        const mocks = Array.from({ length: quantity }, () =>
            this.generateMock(data),
        );
        await this.urlRepository.bulkInsert(mocks);
    }

    private generateMock({ code, url, userId }: UrlFactoryData) {
        const entity = new UrlEntity();
        entity.setCode(code ?? UrlEntity.generateShortCode());
        entity.setUrl(url ?? faker.internet.url());
        entity.setUserId(userId ?? null);
        return entity;
    }
}
