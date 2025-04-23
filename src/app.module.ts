import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ShortenerModule } from './app/modules/shortener/shortener.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: './.env',
        }),
        ShortenerModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
