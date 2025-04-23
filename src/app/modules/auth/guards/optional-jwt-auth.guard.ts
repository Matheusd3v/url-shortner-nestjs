import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserEntity } from '../../users/entities/user.entity';

@Injectable()
export class OptionalJwtAuthGuard extends AuthGuard('jwt') {
    override handleRequest<TUser = any>(
        err: Error | null,
        user: UserEntity | null,
    ): TUser {
        if (err || !user) {
            return null as TUser;
        }
        return user as TUser;
    }
}
