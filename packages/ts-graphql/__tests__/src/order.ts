import { Order } from '@nger/ast.core'
import { Controller } from '@nger/core';
import { Query, Args } from '@nger/graphql'
import { User, User2 } from './user'
interface OrderDemo {
    title: string;
    demo: OrderDemo;
}
@Controller()
export class OrderController {
    @Query()
    async getUser(@Args('order1') order?: User): Promise<User> {
        return [true]
    }
}
