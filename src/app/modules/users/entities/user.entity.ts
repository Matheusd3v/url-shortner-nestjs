import { CommonEntity } from '@shared/classes/common-entity';

export class UserEntity extends CommonEntity {
    private email: string;
    private password: string;

    public setEmail(email: string) {
        this.email = email.trim().toLocaleLowerCase();
    }

    public setPassword(password: string) {
        this.password = password;
    }

    public getEmail(): string {
        return this.email;
    }

    public getPassword(): string {
        return this.password;
    }
}
