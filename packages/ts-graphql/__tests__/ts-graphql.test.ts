import { toGraphql } from '../lib';
import { join } from 'path';
import { writeFileSync } from 'fs';
const graphqlString = toGraphql(join(__dirname, 'src/main.ts'));
if (graphqlString) {
    writeFileSync(join(__dirname, 'graphql.graphql'), graphqlString)
    debugger;
}