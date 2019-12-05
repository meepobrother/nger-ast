import { NestFactory } from '@nestjs/core';
import { DemoModule } from './demo.module';

// bootstrap
export async function bootstrap() {
    // create
    const app = await NestFactory.create(DemoModule);
    // listen
    app.listen(9000)
}
// bootstrap
bootstrap();
