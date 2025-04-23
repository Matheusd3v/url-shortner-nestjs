import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUrl } from 'class-validator';

export class ShortenUrlRequestDto {
    @ApiProperty()
    @IsString()
    @IsUrl()
    url: string;

    userId: number | null;
    code: string;
}
