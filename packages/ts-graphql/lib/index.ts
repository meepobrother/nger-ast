export * from './compiler';
export * from './ts-graphql';
import { CompilerContext } from './compiler';
import { TsGraphqlVisitor } from './ts-graphql';
import { Project } from '@nger/ast.tsc';
import { DocumentNode } from '@nger/ast.graphql';
import { NestDecoratorVisitor } from './handlers/decorator';
import { join } from 'path';
import { existsSync } from 'fs';
import { print } from '@nger/ast.graphql';
const root = process.cwd();
const tsconfigPath = getTsConfigPath(root);
function getTsConfigPath(path: string): string {
    const dist = join(path, 'tsconfig.json')
    if (existsSync(dist)) {
        return dist;
    }
    return getTsConfigPath(join(path, '..'))
}
export function toGraphql(src: string, tsconfig?: string): string | undefined {
    const doc = tsGraphqlAst(src);
    if (doc) return print(doc)
}
export function tsGraphqlAst(src: string, tsconfig?: string): DocumentNode | undefined {
    const project = new Project([src], tsconfig || tsconfigPath);
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