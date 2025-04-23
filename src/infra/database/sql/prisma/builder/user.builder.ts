import { IFindOptionsUserDto } from '@modules/users/dtos/find-options.dto';
import { Prisma } from '@root/generated/prisma/client';

export class UserBuilder {
    static build(dto?: IFindOptionsUserDto) {
        const where: Prisma.UserWhereInput = {};

        if (!dto?.where) return { where };

        Object.entries(dto.where).forEach(([key, value]) => {
            if (value === undefined) return;
            where[key] = value;
        });

        return { where };
    }
}
