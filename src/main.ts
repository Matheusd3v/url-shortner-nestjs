import './infra/opentelemetry/tracing';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            whitelist: true,
        }),
    );

    const config = new DocumentBuilder()
        .setVersion(process.env.npm_package_version ?? '1')
        .addBearerAuth()
        .setTitle('Url Shortener API')
        .build();
    const documentFactory = () => SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/doc', app, documentFactory);

    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
