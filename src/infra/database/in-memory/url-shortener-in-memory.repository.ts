/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Injectable } from '@nestjs/common';
import { UrlRepository } from '@root/src/app/modules/shortener/repositories/url.repository';
import { IFindOptionsUrlDto } from '@modules/shortener/dtos/find-options.dto';
import { UrlEntity } from '@modules/shortener/entities/url-shortener.entity';
import { randomUUID } from 'crypto';

@Injectable()
export class UrlShortenerInMemoryRepository implements UrlRepository {
    private lastId: number;
    private database: UrlEntity[];
    private readonly getterMap = {
        id: (entity: UrlEntity) => entity.getId(),
        code: (entity: UrlEntity) => entity.getCode(),
        uuid: (entity: UrlEntity) => entity.getUuid(),
        userId: (entity: UrlEntity) => entity.getUserId(),
    };

    constructor() {
        this.database = [];
        this.lastId = 0;
    }

    public async update(entity: UrlEntity): Promise<void> {
        await Promise.resolve(() => {
            const index = this.database.findIndex(
                (e) => e.getId() === entity.getId(),
            );
            if (index !== -1) {
                entity.setUpdatedAt(new Date());
                this.database[index] = entity;
            }
        });
    }

    public async save(entity: UrlEntity): Promise<UrlEntity> {
        entity.setId(this.getNewId());
        entity.setUuid(randomUUID());
        entity.setCreatedAt(new Date());
        entity.setUpdatedAt(new Date());
        entity.setDeletedAt(null);
        this.database.push(entity);
        return Promise.resolve(entity);
    }

    public async findOne(args: IFindOptionsUrlDto): Promise<UrlEntity | null> {
        if (!args.where) return null;
        const fields = Object.entries(args?.where);

        return Promise.resolve(
            this.database.find((entity) =>
                fields.every(
                    ([key, val]) => this.getterMap[key]?.(entity) === val,
                ),
            ) || null,
        );
    }

    public async findAll(args?: IFindOptionsUrlDto): Promise<UrlEntity[]> {
        if (!args?.where) return this.database;
        const fields = Object.entries(args?.where);

        return Promise.resolve(
            this.database.filter((entity) =>
                fields.every(
                    ([key, val]) => this.getterMap[key]?.(entity) === val,
                ),
            ) || null,
        );
    }

    private getNewId() {
        this.lastId += 1;
        return this.lastId;
    }
}
