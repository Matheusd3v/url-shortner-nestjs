import { IFindOptionsUrlDto } from '@modules/shortener/dtos/find-options.dto';
import { Prisma } from '@root/generated/prisma/client';

export class UrlPrismaBuilder {
    static build(dto?: IFindOptionsUrlDto) {
        const where: Prisma.UrlWhereInput = {};

        if (!dto?.where) return { where };

        if (dto.where?.code) {
            where.code = dto.where?.code;
        }

        if (dto.where.id) {
            where.id = dto.where.id;
        }

        if (dto.where.uuid) {
            where.uuid = dto.where.uuid;
        }

        return { where };
    }
}
