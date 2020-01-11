import { corePlatform, Module } from '@nger/core'
import { OrderController } from './order';

@Module({
    controllers: [
        OrderController
    ]
})
export class AppModule { }

corePlatform().bootstrapModule(AppModule).then(res => {
    debugger;
})
