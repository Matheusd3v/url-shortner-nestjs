import { UrlEntity } from '@modules/shortener/entities/url-shortener.entity';
import { Url } from '@root/generated/prisma/client';

export class UrlMapper {
    static fromDB(data: Url) {
        const entity = new UrlEntity();

        entity.setDeletedAt(data.deletedAt);
        entity.setCreatedAt(data.createdAt);
        entity.setUpdatedAt(data.updatedAt);
        entity.setClicks(data.clicks);
        entity.setUserId(data.userId);
        entity.setCode(data.code);
        entity.setUuid(data.uuid);
        entity.setUrl(data.url);
        entity.setId(data.id);

        return entity;
    }
}
