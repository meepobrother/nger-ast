import { Module } from '@nestjs/common'
import { DemoGraphql } from './graphql';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
@Module({
    imports: [
        GraphQLModule.forRootAsync({
            useFactory: () => {
                return {
                    typePaths: [join(__dirname, 'assets', 'magnus.server.graphql')]
                }
            }
        })
    ],
    providers: [
        DemoGraphql
    ]
})
export class DemoModule { }
