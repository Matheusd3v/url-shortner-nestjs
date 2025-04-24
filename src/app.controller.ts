import { Controller, Get } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

@Controller('api')
export class AppController {
    @Get()
    @ApiOperation({ summary: 'API Presentation' })
    getHello(): { [key: string]: string } {
        return {
            message: `Url Shortener API - ${new Date().toISOString()}`,
        };
    }
}
