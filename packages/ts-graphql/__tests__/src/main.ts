import { NestFactory } from '@nestjs/core';
import { DemoModule } from './demo.module';
import * as fs from 'fs';

// bootstrap
export async function bootstrap() {
    // create
    const app = await NestFactory.create(DemoModule);
    // fs
    fs.writeFileSync(``, ``)
    // listen
    app.listen(9000)
}
// bootstrap
bootstrap();
