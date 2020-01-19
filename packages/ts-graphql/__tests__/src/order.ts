import { Controller } from '@nger/core';
import { Query } from '@nger/graphql'
import { User } from './user'
export type UserCodeId = Pick<User, 'code' | 'id'>;
@Controller()
export class OrderController {
    @Query()
    async getUser(): Promise<UserCodeId[]> {
        return []
    }

    @Query()
    async getUser2(): Promise<UserCodeId[]> {
        return []
    }

    @Query()
    async getUser3(): Promise<UserCodeId[]> {
        return []
    }
}
