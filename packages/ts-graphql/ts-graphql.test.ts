import { CompilerContext, TsGraphqlVisitor } from '@nger/ast.ts-graphql';
import { Project } from '@nger/ast_ts';
import { print, DocumentNode } from '@nger/ast.graphql';
import { join } from 'path';
import { writeFileSync } from 'fs';
import { NestDecoratorVisitor } from './lib/handlers/decorator';
import { parse, graphql as graphqlRun } from 'graphql';
import { makeExecutableSchema } from 'graphql-tools'
const project = new Project([
    join(__dirname, '__tests__/src', 'main.ts'),
    join(__dirname, '__tests__/src', 'demo.module.ts')
]);
const compilerContext = new CompilerContext(project.program)
const tsGraphqlVisitor = new TsGraphqlVisitor(new NestDecoratorVisitor());
const node = project.getSourceFile(join(__dirname, '__tests__/src', 'main.ts'));
if (node) {
    // const file = compilerVisitor.visitSourceFile(node, compilerContext);
    const graphql = tsGraphqlVisitor.visitSourceFile(node, compilerContext)
    const doc = new DocumentNode();
    doc.definitions = compilerContext.statements;
    const graphqlString = print(doc);
    writeFileSync(join(__dirname, '1.graphql'), graphqlString);

    const ast = parse(graphqlString);
    const schema = makeExecutableSchema({
        typeDefs: ast,
        resolvers: []
    })
    graphqlRun({
        schema,
        source: `query {
            getDemo(input: "demo"){
                title,
                desc
            }
        }`
    }).then(res => {
        debugger;
    })
    debugger;
}