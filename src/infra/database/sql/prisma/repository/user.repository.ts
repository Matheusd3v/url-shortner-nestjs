import { Injectable } from '@nestjs/common';
import { UserRepository } from '@modules/users/repositories/user.repository';
import { IFindOptionsUserDto } from '@modules/users/dtos/find-options.dto';
import { UserEntity } from '@modules/users/entities/user.entity';
import { TransactionHost } from '@nestjs-cls/transactional';
import { TransactionalAdapterPrisma } from '@nestjs-cls/transactional-adapter-prisma';
import { PrismaClient } from '@root/generated/prisma/client';
import { UserMapper } from '../mappers/user.mapper';
import { UserBuilder } from '../builder/user.builder';

@Injectable()
export class UserPostgresRepository implements UserRepository {
    constructor(
        private readonly prismaService: TransactionHost<
            TransactionalAdapterPrisma<PrismaClient>
        >,
    ) {}

    public async save(user: UserEntity): Promise<UserEntity> {
        const saved = await this.prismaService.tx.user.create({
            data: {
                password: user.getPassword(),
                email: user.getEmail(),
            },
        });

        return UserMapper.fromDB(saved);
    }

    public async findOne(
        args: IFindOptionsUserDto,
    ): Promise<UserEntity | null> {
        const user = await this.prismaService.tx.user.findFirst({
            where: UserBuilder.build(args)?.where,
        });
        if (!user) return null;
        return UserMapper.fromDB(user);
    }
}
