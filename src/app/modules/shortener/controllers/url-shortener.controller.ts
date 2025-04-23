import {
    Body,
    Controller,
    Get,
    HttpStatus,
    Param,
    Post,
    Res,
} from '@nestjs/common';
import { ShortenUrlRequestDto } from '../dtos/shorten-url-request.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ShortedUrlResponseDto } from '../dtos/shorted-url-response.dto';
import { ShortenUrlUsecase } from '../usecases/shorten-url.usecase';
import { FindOriginalUrlUseCase } from '../usecases/find-original-url.usecase';
import { Response } from 'express';

@ApiTags('Url Shortener')
@Controller()
export class UrlShortenerController {
    constructor(
        private readonly shortenUrlUseCase: ShortenUrlUsecase,
        private readonly findOriginalUrlUseCase: FindOriginalUrlUseCase,
    ) {}

    @Post('/shorten')
    @ApiResponse({
        status: HttpStatus.CREATED,
        type: ShortedUrlResponseDto,
    })
    async shortenUrl(
        @Body() body: ShortenUrlRequestDto,
    ): Promise<ShortedUrlResponseDto> {
        return this.shortenUrlUseCase.execute(body);
    }

    @Get('/:code')
    @ApiResponse({
        status: HttpStatus.MOVED_PERMANENTLY,
        description: 'Moves client to original url',
    })
    async redirectToOriginalUrl(
        @Param('code') code: string,
        @Res() res: Response,
    ) {
        const { url } = await this.findOriginalUrlUseCase.execute(code);
        return res.redirect(HttpStatus.MOVED_PERMANENTLY, url);
    }
}
