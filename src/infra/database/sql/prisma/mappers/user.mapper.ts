import { User } from '@root/generated/prisma/client';
import { UserEntity } from '@modules/users/entities/user.entity';

export class UserMapper {
    static fromDB(user: User) {
        const entity = new UserEntity();

        entity.setId(user.id);
        entity.setUuid(user.uuid);
        entity.setEmail(user.email);
        entity.setPassword(user.password);
        entity.setCreatedAt(user.createdAt);
        entity.setUpdatedAt(user.updatedAt);
        entity.setDeletedAt(user.deletedAt);

        return entity;
    }
}
