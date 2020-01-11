import { Order } from '@nger/ast.core'
import { Controller } from '@nger/core';
import { Query } from '@nger/graphql'
import { User } from './user'
@Controller()
export class OrderController {
    @Query()
    getUser(order?: Order<Pick<User, 'username' | 'uid'>>): Promise<User> {
        return {} as any;
    }
}
