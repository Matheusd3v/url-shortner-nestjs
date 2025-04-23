import { Url } from '@root/generated/prisma/client';
import { UrlEntity } from '@root/src/app/modules/shortener/entities/url-shortener.entity';

export class UrlMapper {
    static fromDB(data: Url) {
        const entity = new UrlEntity();

        entity.setDeletedAt(data.deletedAt);
        entity.setCreatedAt(data.createdAt);
        entity.setUpdatedAt(data.updatedAt);
        entity.setClicks(data.clicks);
        entity.setCode(data.code);
        entity.setUuid(data.uuid);
        entity.setUrl(data.url);
        entity.setId(data.id);

        return entity;
    }
}
