export class CommonEntity {
    private id: number;
    private uuid: string;
    private createdAt: Date;
    private updatedAt: Date;
    private deletedAt: Date | null;

    public setId(id: number) {
        this.id = id;
    }

    public setUuid(uuid: string) {
        this.uuid = uuid;
    }

    public setCreatedAt(date: Date) {
        this.createdAt = date;
    }

    public setUpdatedAt(date: Date) {
        this.updatedAt = date;
    }

    public setDeletedAt(date: Date | null) {
        this.deletedAt = date;
    }

    public getId(): number {
        return this.id;
    }

    public getUuid(): string {
        return this.uuid;
    }

    public getCreatedAt(): Date {
        return this.createdAt;
    }

    public getUpdatedAt(): Date {
        return this.updatedAt;
    }

    public getDeletedAt(): Date | null {
        return this.deletedAt;
    }
}
