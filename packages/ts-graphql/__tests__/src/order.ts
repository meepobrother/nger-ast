import { Order } from '@nger/ast.core'
import { Controller } from '@nger/core';
import { Query } from '@nger/graphql'
import { User, User2 } from './user'
@Controller()
export class OrderController {
    @Query()
    getUser(order?: Order<Pick<User & User2, 'username' | 'uid' | 'title'>>): Array<User | User2> {
        return {} as any;
    }
}
