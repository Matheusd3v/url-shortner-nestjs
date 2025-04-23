import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtRequestPayloadDto } from './dtos/jwt-request-payload.dto';
import { UserRepository } from '../users/repositories/user.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(
        @Inject('UserRepository')
        private readonly userRepository: UserRepository,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: true,
            secretOrKey: process.env.JWT_SECRET ?? '',
        });
    }

    public async validate(payload: JwtRequestPayloadDto) {
        const { userUuid } = this.validateJwt(payload);
        const user = await this.userRepository.findOne({
            where: { uuid: userUuid },
        });

        if (!user) {
            const message = 'Unauthorized!';
            throw new UnauthorizedException(message);
        }

        return user;
    }

    private validateJwt(payload: JwtRequestPayloadDto) {
        if (new Date(payload.exp * 1000) < new Date()) {
            const message = 'Token expired!';
            throw new UnauthorizedException(message);
        }

        return payload;
    }
}
