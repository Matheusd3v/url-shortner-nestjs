import { PickType } from '@nestjs/swagger';
import { RegisterUserRequestDto } from '../../users/dtos/register-user-request.dto';

export class LoginRequestDto extends PickType(RegisterUserRequestDto, [
    'email',
    'password',
] as const) {}
