import { IFindOptionsUserDto } from '../dtos/find-options.dto';
import { UserEntity } from '../entities/user.entity';

export interface UserRepository {
    save(user: UserEntity): Promise<UserEntity>;
    findOne(args: IFindOptionsUserDto): Promise<UserEntity | null>;
}
