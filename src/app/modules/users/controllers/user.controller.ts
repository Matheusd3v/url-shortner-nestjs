import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { RegisterUserRequestDto } from '../dtos/register-user-request.dto';
import { RegisterUserUseCase } from '../usecases/register-user.usecase';
import { GenerateAccessTokenUseCase } from '../../auth/usecases/generate-acces-token.usecase';
import { RegisterUserResponseDto } from '../dtos/register-user-response.dto';

@ApiTags('User')
@Controller('users')
export class UserController {
    constructor(
        private readonly registerUserUseCase: RegisterUserUseCase,
        private readonly generateAccesstokenUseCase: GenerateAccessTokenUseCase,
    ) {}

    @Post()
    @ApiResponse({
        status: HttpStatus.CREATED,
        type: RegisterUserResponseDto,
    })
    async register(@Body() body: RegisterUserRequestDto) {
        const user = await this.registerUserUseCase.execute(body);
        const token = await this.generateAccesstokenUseCase.execute({
            userUuid: user.getUuid(),
        });
        return { token, uuid: user.getUuid() };
    }
}
