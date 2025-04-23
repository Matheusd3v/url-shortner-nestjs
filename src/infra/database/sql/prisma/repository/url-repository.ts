import { TransactionHost } from '@nestjs-cls/transactional';
import { TransactionalAdapterPrisma } from '@nestjs-cls/transactional-adapter-prisma';
import { Injectable } from '@nestjs/common';
import { IFindOptionsUrlDto } from '@modules/shortener/dtos/find-options.dto';
import { UrlEntity } from '@modules/shortener/entities/url-shortener.entity';
import { UrlRepository } from '@modules/shortener/repositories/url.repository';
import { UrlMapper } from '../mappers/url.mapper';
import { UrlPrismaBuilder } from '../builder/url.builder';
import { PrismaClient } from '@root/generated/prisma/client';

@Injectable()
export class UrlPostgresqlRepository implements UrlRepository {
    constructor(
        private readonly prismaService: TransactionHost<
            TransactionalAdapterPrisma<PrismaClient>
        >,
    ) {}

    public async save(entity: UrlEntity): Promise<UrlEntity> {
        const saved = await this.prismaService.tx.url.create({
            data: {
                userId: entity.getUserId(),
                code: entity.getCode(),
                url: entity.getUrl(),
            },
        });

        return UrlMapper.fromDB(saved);
    }

    public async findOne(args: IFindOptionsUrlDto): Promise<UrlEntity | null> {
        const url = await this.prismaService.tx.url.findFirst({
            ...UrlPrismaBuilder.build(args),
        });
        if (!url) return null;
        return UrlMapper.fromDB(url);
    }

    public async findAll(args?: IFindOptionsUrlDto): Promise<UrlEntity[]> {
        const urls = await this.prismaService.tx.url.findMany({
            ...UrlPrismaBuilder.build(args),
        });
        if (!urls) return [];
        return urls.map((url) => UrlMapper.fromDB(url));
    }

    public async update(entity: UrlEntity): Promise<void> {
        await this.prismaService.tx.url.update({
            where: { id: entity.getId() },
            data: {
                deletedAt: entity.getDeletedAt(),
                clicks: entity.getClicks(),
                url: entity.getUrl(),
            },
        });
    }
}
