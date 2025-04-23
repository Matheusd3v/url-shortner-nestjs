import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { UserEntity } from '../../modules/users/entities/user.entity';
import { Request } from 'express';

export const GetUserAuth = createParamDecorator(
    (_, ctx: ExecutionContext): UserEntity => {
        const req = ctx
            .switchToHttp()
            .getRequest<Request & { user: UserEntity }>();
        return req.user;
    },
);
