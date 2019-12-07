# `ts-graphql`

> 根据ts代码自动生成graphql文件

## Usage

```ts
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
    async getDepartment(): Promise<Required<Department<Partial<User>>>> {
        return {} as any;
    }
}
```
生成

```graphql
scalar Date

scalar Json

type User {
  username: String!
  password: String!
}

type UserPartial {
  username: String
  password: String
}

type UserPartialDepartment {
  title: UserPartial
}

type UserPartialDepartmentRequired {
  title: UserPartialDepartment!
}

type Query {
  getDepartment: UserPartialDepartmentRequired!
}
```
