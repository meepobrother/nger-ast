import { Module } from '@nestjs/common'
import { DemoGraphql, DateScalar, JsonScalar } from './graphql';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
@Module({
    imports: [
        GraphQLModule.forRoot({
            typePaths: [join(__dirname, 'graphql.graphql')],
            resolverValidationOptions: {
                requireResolversForResolveType: false
            }
        })
    ],
    providers: [
        DateScalar,
        JsonScalar,
        DemoGraphql
    ]
})
export class DemoModule { }
