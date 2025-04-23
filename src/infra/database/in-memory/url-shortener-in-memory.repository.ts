/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Injectable } from '@nestjs/common';
import { IUrlShortenerRepository } from '@modules/shortener/repositories/url-shortener.repository';
import { IFindOptionsUrlShortenerDto } from '@modules/shortener/dtos/find-options.dto';
import { UrlShortenerEntity } from '@modules/shortener/entities/url-shortener.entity';
import { randomUUID } from 'crypto';

@Injectable()
export class UrlShortenerInMemoryRepository implements IUrlShortenerRepository {
    private lastId: number;
    private database: UrlShortenerEntity[];
    private readonly getterMap = {
        id: (entity: UrlShortenerEntity) => entity.getId(),
        code: (entity: UrlShortenerEntity) => entity.getCode(),
        uuid: (entity: UrlShortenerEntity) => entity.getUuid(),
        userId: (entity: UrlShortenerEntity) => entity.getUserId(),
    };

    constructor() {
        this.database = [];
        this.lastId = 0;
    }

    public async update(entity: UrlShortenerEntity): Promise<void> {
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

    public async save(entity: UrlShortenerEntity): Promise<UrlShortenerEntity> {
        entity.setId(this.getNewId());
        entity.setUuid(randomUUID());
        entity.setCreatedAt(new Date());
        entity.setUpdatedAt(new Date());
        entity.setDeletedAt(null);
        this.database.push(entity);
        return Promise.resolve(entity);
    }

    public async findOne(
        args: IFindOptionsUrlShortenerDto,
    ): Promise<UrlShortenerEntity | null> {
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

    public async findAll(
        args?: IFindOptionsUrlShortenerDto,
    ): Promise<UrlShortenerEntity[]> {
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
