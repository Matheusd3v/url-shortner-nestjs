import { ShortenUrlRequestDto } from '../dtos/shorten-url-request.dto';
import { UrlShortenerEntity } from '../entities/url-shortener.entity';

export class UrlShortenerTransformer {
    static toEntity(dto: ShortenUrlRequestDto): UrlShortenerEntity {
        const entity = new UrlShortenerEntity();
        entity.setCode(dto.code);
        entity.setUrl(dto.url);
        entity.setUserId(dto?.userId ?? null);
        return entity;
    }
}
