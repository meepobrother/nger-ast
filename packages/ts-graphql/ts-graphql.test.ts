import { tsGraphql } from '@nger/ast.ts-graphql';
import { print } from '@nger/ast.graphql';
import { join } from 'path';
import { writeFileSync } from 'fs';
const doc = tsGraphql(join(__dirname, '__tests__/src/main.ts'));
if (doc) {
    const graphqlString = print(doc);
    writeFileSync(join(__dirname, '__tests__/src/graphql.graphql'), graphqlString)
}