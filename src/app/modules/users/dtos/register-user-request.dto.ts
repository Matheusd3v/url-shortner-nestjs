import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class RegisterUserRequestDto {
    @ApiProperty()
    @IsString()
    @MaxLength(255)
    @IsNotEmpty()
    @Transform(({ value }) => (value ? String(value).toLocaleLowerCase() : ''))
    email: string;

    @ApiProperty()
    @IsString()
    @MaxLength(16)
    @IsNotEmpty()
    password: string;
}
