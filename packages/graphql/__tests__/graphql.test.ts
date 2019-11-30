import { parse } from 'graphql';
import { join } from 'path';
import { readFileSync, writeFileSync } from 'fs';
import { moduleRef, print, ASTNode, toJson } from '../lib';
const ast = parse(readFileSync(join(__dirname, `test.graphql`)).toString('utf8'))
const res = moduleRef.create<ASTNode>(ast, 'kind')
const json = toJson(res);
const graphql = print(res);
writeFileSync(join(__dirname, 'test2.graphql'), graphql)
debugger;
