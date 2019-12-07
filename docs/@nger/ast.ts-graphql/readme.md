# `ts-graphql`

> 根据ts代码自动生成graphql文件

## Usage

```ts
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
```
生成

```graphql
scalar Date

scalar Json

"""用户"""
input UserInput {
  """用户名"""
  username: String!
  """密码"""
  password: String!
}

"""用户"""
type User {
  """用户名"""
  username: String!
  """密码"""
  password: String!
}

type UserPartial {
  """用户名"""
  username: String
  """密码"""
  password: String
}

"""部门"""
type UserPartialDepartment {
  """部门名称"""
  title: UserPartial
}

type UserPartialDepartmentRequired {
  """部门名称"""
  title: UserPartialDepartment!
}

type Query {
  """get department"""
  getDepartment(user: UserInput!): UserPartialDepartmentRequired!
}

```
