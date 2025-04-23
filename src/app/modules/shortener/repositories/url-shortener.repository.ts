import { IFindOptionsUrlShortenerDto } from '../dtos/find-options.dto';
import { UrlShortenerEntity } from '../entities/url-shortener.entity';

export interface IUrlShortenerRepository {
    save(entity: UrlShortenerEntity): Promise<UrlShortenerEntity>;
    findOne(
        args: IFindOptionsUrlShortenerDto,
    ): Promise<UrlShortenerEntity | null>;
    findAll(args?: IFindOptionsUrlShortenerDto): Promise<UrlShortenerEntity[]>;
    update(entity: UrlShortenerEntity): Promise<void>;
}
