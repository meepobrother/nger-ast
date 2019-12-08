import { Module } from '@nestjs/common'
import { DemoGraphql, DateScalar, JsonScalar, DemoUnion } from './graphql';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
@Module({
    imports: [
        GraphQLModule.forRoot({
            typePaths: [join(__dirname, 'graphql.graphql')],
            resolverValidationOptions: {
                requireResolversForResolveType: false,
                allowResolversNotInSchema: true
            }
        })
    ],
    providers: [
        DateScalar,
        JsonScalar,
        DemoGraphql,
        DemoUnion
    ]
})
export class DemoModule { }
