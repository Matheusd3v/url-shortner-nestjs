import {
    Injectable,
    OnApplicationShutdown,
    OnModuleInit,
} from '@nestjs/common';
import { PrismaClient } from '@root/generated/prisma/client';

@Injectable()
export class PrismaPGService
    extends PrismaClient
    implements OnModuleInit, OnApplicationShutdown
{
    constructor() {
        super({
            transactionOptions: {
                timeout: 30000,
            },
        });
    }

    async onApplicationShutdown() {
        await this.$disconnect();
    }

    async onModuleInit() {
        await this.$connect();
    }
}
