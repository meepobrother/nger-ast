import { corePlatform, Module, Controller } from '@nger/core'
import { Query, Mutation, Subscription } from '@nger/graphql'
@Controller()
export class DemoController {
    @Query()
    getUser(): any {
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