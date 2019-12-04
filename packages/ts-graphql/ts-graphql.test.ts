import { CompilerContext, TsGraphqlVisitor } from '@nger/ast.ts-graphql';
import { Project } from '@nger/ast_ts';
import { print } from '@nger/ast.graphql';
import { join } from 'path';
import { writeFileSync } from 'fs';
const project = new Project([
    join(__dirname, '__tests__/src', 'main.ts'),
    join(__dirname, '__tests__/src', 'demo.module.ts')
]);
const compilerContext = new CompilerContext(project.program)
const tsGraphqlVisitor = new TsGraphqlVisitor();
const node = project.getSourceFile(join(__dirname, '__tests__/src', 'main.ts'));
if (node) {
    // const file = compilerVisitor.visitSourceFile(node, compilerContext);
    const graphql = tsGraphqlVisitor.visitSourceFile(node, compilerContext)
    // const graphqlString = print(graphql);
    // const ast = parse(graphqlString);
    // writeFileSync(join(__dirname, '1.graphql'), graphqlString);
    debugger;
}