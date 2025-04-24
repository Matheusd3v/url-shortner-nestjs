import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginRequestDto } from '../dtos/login-request';
import { LoginUseCase } from '../usecases/login.usecase';
import { GenerateAccessTokenUseCase } from '../usecases/generate-acces-token.usecase';
import { LoginResponseDto } from '../dtos/login-response.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(
        private readonly loginUseCase: LoginUseCase,
        private readonly generateAccessTokenUseCase: GenerateAccessTokenUseCase,
    ) {}

    @Post()
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: HttpStatus.OK,
        type: LoginResponseDto,
    })
    @ApiOperation({ summary: 'Login' })
    async login(@Body() body: LoginRequestDto): Promise<LoginResponseDto> {
        const user = await this.loginUseCase.execute(body);
        const token = await this.generateAccessTokenUseCase.execute({
            userUuid: user.getUuid(),
        });

        return { token, uuid: user.getUuid() };
    }
}
