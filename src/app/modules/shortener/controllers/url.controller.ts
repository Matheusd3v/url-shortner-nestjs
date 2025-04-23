import {
    Controller,
    Get,
    Param,
    ParseUUIDPipe,
    UnauthorizedException,
    UseGuards,
} from '@nestjs/common';
import { UserUrlsResponseDto } from '../dtos/user-urls-response.dto';
import { GetUserAuth } from '@root/src/app/shared/decorators/user-auth.decorator';
import { AuthGuard } from '@nestjs/passport';
import { UserEntity } from '../../users/entities/user.entity';
import { ListUserUrlsUseCase } from '../usecases/list-user-urls.usecase';

@Controller('users')
export class UrlController {
    constructor(private readonly listUserUrlsUseCase: ListUserUrlsUseCase) {}

    @Get('/:userUuid/urls')
    @UseGuards(AuthGuard('jwt'))
    async listUrls(
        @Param('userUuid', new ParseUUIDPipe({ version: '4' }))
        userUuid: string,
        @GetUserAuth() user: UserEntity,
    ): Promise<UserUrlsResponseDto> {
        if (user.getUuid() !== userUuid) {
            throw new UnauthorizedException();
        }

        return this.listUserUrlsUseCase.execute(user);
    }
}
