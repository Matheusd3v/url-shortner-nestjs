import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RegisterUserRequestDto } from '../dtos/register-user-request.dto';
import { RegisterUserUseCase } from '../usecases/register-user.usecase';
import { GenerateAccessTokenUseCase } from '../../auth/usecases/generate-acces-token.usecase';

@ApiTags('User')
@Controller('Users')
export class UserController {
    constructor(
        private readonly registerUserUseCase: RegisterUserUseCase,
        private readonly generateAccesstokenUseCase: GenerateAccessTokenUseCase,
    ) {}

    @Post()
    async register(@Body() body: RegisterUserRequestDto) {
        const user = await this.registerUserUseCase.execute(body);
        const token = await this.generateAccesstokenUseCase.execute({
            userUuid: user.getUuid(),
        });
        return { token, uuid: user.getUuid() };
    }
}
