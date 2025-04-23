import { ApiProperty } from '@nestjs/swagger';

export class ShortedUrlResponseDto {
    @ApiProperty()
    urlShortened: string;
}
