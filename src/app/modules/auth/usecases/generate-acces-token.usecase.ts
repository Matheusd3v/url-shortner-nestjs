import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { JwtPayloadDto } from '../dtos/jwt-payload.dto';

@Injectable()
export class GenerateAccessTokenUseCase {
    constructor(
        private readonly jwtService: JwtService,
        private readonly config: ConfigService,
    ) {}

    public async execute(payload: JwtPayloadDto): Promise<string> {
        return this.jwtService.signAsync(payload, {
            expiresIn: this.config.get<string>('JWT_EXPIRATION'),
        });
    }
}
