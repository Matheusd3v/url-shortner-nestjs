import { Global, Module } from '@nestjs/common';
import { PrismaPGService } from './prisma-pg.service';

@Global()
@Module({
    providers: [PrismaPGService],
    exports: [PrismaPGService],
})
export class PrismaModule {}
