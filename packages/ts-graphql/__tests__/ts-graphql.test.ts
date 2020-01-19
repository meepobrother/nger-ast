import { toGraphql } from '../lib';
import { join } from 'path';
import { writeFileSync } from 'fs';
const graphqlString = toGraphql(join(__dirname, 'src/main.ts'));
if (graphqlString) {
    writeFileSync(join(__dirname, 'graphql.graphql'), graphqlString)
    debugger;
}

// 108 * 20 / 4 = 500 / 30 = 20;
// 一天8个 维护 2个 