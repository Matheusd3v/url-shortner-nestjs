import { IFindOptionsUrlDto } from '../dtos/find-options.dto';
import { UrlEntity } from '../entities/url-shortener.entity';

export interface UrlRepository {
    save(entity: UrlEntity): Promise<UrlEntity>;
    findOne(args: IFindOptionsUrlDto): Promise<UrlEntity | null>;
    findAll(args?: IFindOptionsUrlDto): Promise<UrlEntity[]>;
    update(entity: UrlEntity): Promise<void>;
}
