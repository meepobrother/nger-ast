import { CompilerVisitor, CompilerContext } from '@nger/ast.ts-graphql';
import { Project } from '@nger/ast.ts';
import { join } from 'path';

const project = new Project([
    join(__dirname, 'src', 'main.ts')
]);
const compilerContext = new CompilerContext(project.program)
const compilerVisitor = new CompilerVisitor()
const node = project.getSourceFile(join(__dirname, 'src', 'main.ts'))
compilerVisitor.visit(node, compilerContext);
debugger;