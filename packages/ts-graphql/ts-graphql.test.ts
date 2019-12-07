import { toGraphql } from '@nger/ast.ts-graphql';
import { join } from 'path';
import { writeFileSync } from 'fs';
const graphqlString = toGraphql(join(__dirname, '__tests__/src/main.ts'));
if (graphqlString) {
    writeFileSync(join(__dirname, '__tests__/src/graphql.graphql'), graphqlString)
    debugger;
}