interface UrlWhereOptions {
    id?: number;
    code?: string;
    uuid?: string;
    userId?: number;
}

export interface IFindOptionsUrlDto {
    where?: Partial<UrlWhereOptions>;
}
