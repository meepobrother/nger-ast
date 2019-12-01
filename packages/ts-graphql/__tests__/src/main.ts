import { NestFactory } from '@nestjs/core';
import { DemoModule } from './demo.module';
export async function bootstrap() {
    const app = await NestFactory.create(DemoModule);
    app.listen(9000)
}
bootstrap();
