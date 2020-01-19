export * from './compiler';
import { CompilerContext } from './compiler';
import { Project } from '@nger/ast.tsc';
import { Package, ParseVisitor } from '@nger/ast.proto';
import { join } from 'path';
import { existsSync } from 'fs';
import { TsProtoVisitor } from './ts-proto';
const root = process.cwd();
const tsconfigPath = getTsConfigPath(root);
function getTsConfigPath(path: string): string {
    const dist = join(path, 'tsconfig.json')
    if (existsSync(dist)) {
        return dist;
    }
    return getTsConfigPath(join(path, '..'))
}
export function toProto(src: string, tsconfig?: string): string | undefined {
    const doc = toProtoAst(src);
    const parse = new ParseVisitor();
    if (doc) return doc.visit(parse, '')
}
export function toProtoAst(src: string, tsconfig?: string): Package | undefined {
    const project = new Project([src], tsconfig || tsconfigPath);
    const compilerContext = new CompilerContext(project.program)
    const tsProtoVisitor = new TsProtoVisitor();
    const node = project.getSourceFile(src);
}
