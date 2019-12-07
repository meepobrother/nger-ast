import { Query } from '@nestjs/graphql';
import { Controller } from '@nestjs/common';
/**
 * 用户
 */
interface User {
    /**
     * 用户名
     */
    username: string;
    /**
     * 密码
     */
    password: string;
}
/**
 * 部门
 */
interface Department<T> {
    /**
     * 部门名称
     */
    title?: T;
}
type Required<T> = {
    [P in keyof T]: T[P];
};

@Controller()
export class DemoGraphql {
    /**
     * get department
     * @param {User} user 
     */
    @Query()
    async getDepartment(user: User): Promise<Required<Department<Partial<User>>>> {
        return {} as any;
    }
}
