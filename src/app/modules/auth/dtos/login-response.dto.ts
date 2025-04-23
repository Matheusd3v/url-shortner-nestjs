import { ApiProperty } from '@nestjs/swagger';

export class LoginResponseDto {
    @ApiProperty()
    token: string;

    @ApiProperty()
    uuid: string;
}
