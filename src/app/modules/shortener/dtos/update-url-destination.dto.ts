import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUrl, MaxLength } from 'class-validator';

export class UpdateUrlDestinationDto {
    @IsUrl()
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    @MaxLength(1000)
    destination: string;

    urlUuid: string;
}
