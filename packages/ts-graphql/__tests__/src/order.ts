import { Order } from '@nger/ast.core'
import { Controller } from '@nger/core';
import { Query } from '@nger/graphql'
import { User, User2 } from './user'
interface OrderDemo{
    title: string;
    demo: OrderDemo;
}
@Controller()
export class OrderController {
    @Query()
    getUser(order?: Order<Pick<User & User2, 'username' | 'uid' | 'title'>>) {
        return {
            title: 'demo'
        } as OrderDemo;
    }
}
