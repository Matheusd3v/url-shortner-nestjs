import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class RegisterUserRequestDto {
    @ApiProperty()
    @IsString()
    @MaxLength(255)
    @IsNotEmpty()
    email: string;

    @ApiProperty()
    @IsString()
    @MaxLength(16)
    @IsNotEmpty()
    password: string;
}
