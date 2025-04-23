import { IFindOptionsUrlShortenerDto } from '../dtos/find-options.dto';
import { UrlEntity } from '../entities/url-shortener.entity';

export interface IUrlShortenerRepository {
    save(entity: UrlEntity): Promise<UrlEntity>;
    findOne(args: IFindOptionsUrlShortenerDto): Promise<UrlEntity | null>;
    findAll(args?: IFindOptionsUrlShortenerDto): Promise<UrlEntity[]>;
    update(entity: UrlEntity): Promise<void>;
}
