interface UrlShortenerWhereOptions {
    id?: number;
    code?: string;
    uuid?: string;
    userId?: number;
}

export interface IFindOptionsUrlShortenerDto {
    where?: Partial<UrlShortenerWhereOptions>;
}
