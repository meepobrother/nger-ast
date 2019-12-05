import { Module } from '@nestjs/common'
import { DemoGraphql, DateScalar, JsonScalar } from './graphql';
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
        DateScalar,
        JsonScalar,
        DemoGraphql,
    ]
})
export class DemoModule { }
