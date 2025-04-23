import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    ParseUUIDPipe,
    Patch,
    UnauthorizedException,
    UseGuards,
} from '@nestjs/common';
import { UserUrlsResponseDto } from '../dtos/user-urls-response.dto';
import { GetUserAuth } from '@root/src/app/shared/decorators/user-auth.decorator';
import { AuthGuard } from '@nestjs/passport';
import { UserEntity } from '../../users/entities/user.entity';
import { ListUserUrlsUseCase } from '../usecases/list-user-urls.usecase';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { SoftDeleteUserUrlUseCase } from '../usecases/soft-delete-user-url.usecase';
import { UpdateUrlDestinationDto } from '../dtos/update-url-destination.dto';
import { UpdateUrlDestinationUseCase } from '../usecases/update-url-destination.usecase';

@ApiTags('User Url')
@Controller('users')
export class UrlController {
    constructor(
        private readonly listUserUrlsUseCase: ListUserUrlsUseCase,
        private readonly softDeleteUserUrlUseCase: SoftDeleteUserUrlUseCase,
        private readonly updateUrlDestinationUseCase: UpdateUrlDestinationUseCase,
    ) {}

    @Get('/:userUuid/urls')
    @UseGuards(AuthGuard('jwt'))
    @ApiResponse({
        status: HttpStatus.OK,
        type: UserUrlsResponseDto,
    })
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

    @Delete('/:userUuid/urls/:urlUuid')
    @UseGuards(AuthGuard('jwt'))
    @ApiResponse({
        status: HttpStatus.NO_CONTENT,
        description: 'Empty body',
    })
    @HttpCode(HttpStatus.NO_CONTENT)
    async softDeleteUrl(
        @Param('userUuid', new ParseUUIDPipe({ version: '4' }))
        userUuid: string,
        @Param('urlUuid', new ParseUUIDPipe({ version: '4' }))
        urlUuid: string,
        @GetUserAuth() user: UserEntity,
    ): Promise<void> {
        if (user.getUuid() !== userUuid) {
            throw new UnauthorizedException();
        }
        await this.softDeleteUserUrlUseCase.execute(urlUuid);
    }

    @Patch('/:userUuid/urls/:urlUuid')
    @UseGuards(AuthGuard('jwt'))
    @ApiResponse({
        status: HttpStatus.NO_CONTENT,
        description: 'Empty body',
    })
    @HttpCode(HttpStatus.NO_CONTENT)
    async updateUrlDestination(
        @Param('userUuid', new ParseUUIDPipe({ version: '4' }))
        userUuid: string,
        @Param('urlUuid', new ParseUUIDPipe({ version: '4' }))
        urlUuid: string,
        @GetUserAuth() user: UserEntity,
        @Body() body: UpdateUrlDestinationDto,
    ): Promise<void> {
        if (user.getUuid() !== userUuid) {
            throw new UnauthorizedException();
        }
        body.urlUuid = urlUuid;
        await this.updateUrlDestinationUseCase.execute(body);
    }
}
