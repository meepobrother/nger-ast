import { Resolver, Query } from "@nestjs/graphql";
export interface List<T> {
    data: T[];
    currentPage: number;
    pageSize: number;
    total: number;
}
export interface User {
    username: string;
}
export type Required<T> = {
    [key in keyof T]: T[key]
}
export interface Article {
    title: string;
}
@Resolver()
export class DemoResolver {
    @Query()
    getUser(): List<User> {
        return {} as any;
    }
    @Query()
    getArticles(): Required<Article> {
        return {} as any;
    }
}