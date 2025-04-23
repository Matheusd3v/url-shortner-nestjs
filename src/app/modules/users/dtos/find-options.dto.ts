interface UserWhereOptions {
    id?: number;
    email?: string;
    uuid?: string;
}

export interface IFindOptionsUserDto {
    where?: Partial<UserWhereOptions>;
}
