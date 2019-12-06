export * from './compiler';
export * from './ts-graphql';
import { CompilerContext, TsGraphqlVisitor } from '@nger/ast.ts-graphql';
import { Project } from '@nger/ast.tsc';
import { DocumentNode } from '@nger/ast.graphql';
import { NestDecoratorVisitor } from './handlers/decorator';
import { join, dirname } from 'path';
import { existsSync, readFileSync } from 'fs';
import * as ts from 'typescript';
const root = process.cwd();
const tsconfigPath = getTsConfigPath(root);
function getTsConfigPath(path: string): string {
    const dist = join(path, 'tsconfig.json')
    if (existsSync(dist)) {
        return dist;
    }
    return getTsConfigPath(join(path, '..'))
}
export function tsGraphql(src: string): DocumentNode | undefined {
    const project = new Project([src], tsconfigPath);
    const compilerContext = new CompilerContext(project.program)
    const tsGraphqlVisitor = new TsGraphqlVisitor(new NestDecoratorVisitor());
    const node = project.getSourceFile(src);
    if (node) {
        tsGraphqlVisitor.visitSourceFile(node, compilerContext)
        const doc = new DocumentNode();
        doc.definitions = compilerContext.statements;
        return doc;
    }
}