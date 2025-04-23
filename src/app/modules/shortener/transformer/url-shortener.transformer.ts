import { ShortenUrlRequestDto } from '../dtos/shorten-url-request.dto';
import { UrlEntity } from '../entities/url-shortener.entity';

export class UrlShortenerTransformer {
    static toEntity(dto: ShortenUrlRequestDto): UrlEntity {
        const entity = new UrlEntity();
        entity.setCode(dto.code);
        entity.setUrl(dto.url);
        entity.setUserId(dto?.userId ?? null);
        return entity;
    }
}
