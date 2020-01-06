import { corePlatform, Module, Controller } from '@nger/core'
import { Query } from '@nger/graphql'
import {  Order } from '@nger/ast.core'
interface User {
    username: string;
    uid: number;
}
@Controller()
export class DemoController {
    @Query()
    getUser(order?: Order<User>): any {
        return {} as any;
    }
}
@Module({
    controllers: [
        DemoController
    ]
})
export class AppModule { }

corePlatform().bootstrapModule(AppModule).then(res => {
    debugger;
})
