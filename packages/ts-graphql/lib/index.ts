export * from './compiler';
export * from './ts-graphql';
import { CompilerContext, TsGraphqlVisitor } from '@nger/ast.ts-graphql';
import { Project } from '@nger/ast.tsc';
import { DocumentNode } from '@nger/ast.graphql';
import { NestDecoratorVisitor } from './handlers/decorator';
export function tsGraphql(src: string): DocumentNode | undefined {
    const project = new Project([src]);
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