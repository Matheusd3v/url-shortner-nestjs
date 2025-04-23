import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ShortenUrlRequestDto } from '../dtos/shorten-url-request.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ShortedUrlResponseDto } from '../dtos/shorted-url-response.dto';
import { ShortenUrlUsecase } from '../usecases/shorten-url.usecase';

@ApiTags('Url Shortener')
@Controller()
export class UrlShortenerController {
    constructor(private readonly shortenUrlUseCase: ShortenUrlUsecase) {}

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
}
