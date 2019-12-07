import { Query } from '@nestjs/graphql';
import { Controller } from '@nestjs/common';
interface User {
    username: string;
    password: string;
}
interface Department<T> {
    title?: T;
}
type Required<T> = {
    [P in keyof T]: T[P];
};
@Controller()
export class DemoGraphql {
    @Query()
    async getDepartment(user: User): Promise<Required<Department<Partial<User>>>> {
        return {} as any;
    }
}
