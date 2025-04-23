import { ApiProperty } from '@nestjs/swagger';

class UrlResponse {
    @ApiProperty()
    id: string;

    @ApiProperty()
    clicks: number;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    url: string;

    @ApiProperty()
    redirectUrl: string;
}

export class UserUrlsResponseDto {
    @ApiProperty({ type: () => [UrlResponse] })
    urls: UrlResponse[];
}
