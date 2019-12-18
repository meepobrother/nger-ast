import { Resolver, Query } from "@nestjs/graphql";
import { LoginUserResult as UtilLoginUserResult } from '@ganker/utils';
@Resolver()
export class DemoResolver {
    @Query()
    getArticles(): Pick<UtilLoginUserResult, 'code' | 'message'> {
        return {} as any;
    }
}