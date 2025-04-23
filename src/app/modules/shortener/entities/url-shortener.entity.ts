import { CommonEntity } from '@shared/classes/common-entity';

export class UrlShortenerEntity extends CommonEntity {
    private url: string;
    private code: string;
    private userId: number | null;
    private clicks: number;

    public setUrl(url: string) {
        this.url = url;
    }

    public setCode(code: string) {
        this.code = code;
    }

    public setUserId(id: number | null) {
        this.userId = id;
    }

    public setClicks(value: number) {
        this.clicks = value;
    }

    public getUrl(): string {
        return this.url;
    }

    public getCode(): string {
        return this.code;
    }

    public getUserId(): number | null {
        return this.userId;
    }

    public getClicks(): number {
        return this.clicks;
    }

    static generateShortCode(length = 6) {
        const chars =
            'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';

        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * chars.length);
            result += chars[randomIndex];
        }

        return result;
    }

    public getShortenedUrl(domain: string) {
        return domain.concat(`/${this.code}`);
    }
}
