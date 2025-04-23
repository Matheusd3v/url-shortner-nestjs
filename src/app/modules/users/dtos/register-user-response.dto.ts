import { ApiProperty } from '@nestjs/swagger';

export class RegisterUserResponseDto {
    @ApiProperty()
    token: string;

    @ApiProperty()
    uuid: string;
}
