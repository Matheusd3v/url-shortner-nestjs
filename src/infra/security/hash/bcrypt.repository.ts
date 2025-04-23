import { Injectable } from '@nestjs/common';
import { HashRepository } from './hash.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptRepository implements HashRepository {
    public async hashPassword(password: string): Promise<string> {
        const saltRounds = 10;
        return bcrypt.hash(password, saltRounds);
    }

    public async comparePasswords(
        password: string,
        hashedPassword: string,
    ): Promise<boolean> {
        return bcrypt.compare(password, hashedPassword);
    }
}
