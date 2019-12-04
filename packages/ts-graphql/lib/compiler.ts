import * as ts from 'typescript';
import { PlainModuleRef } from '@nger/plain';
import * as ast from '@nger/ast_ts';
import { cache } from './cache';
export class CompilerHelper {

}
export class CompilerContext {
    typeChecker: ts.TypeChecker;
    moduleRef: PlainModuleRef<any>;
    helper: CompilerHelper;
    program: ts.Program;
    sourceFile: ast.SourceFile;
    children: Map<string, CompilerContext> = new Map();
    parent: CompilerContext;
    _statements: any[] = [];
    setStatements(statements: any[]) {
        this._statements.push(...statements)
    }
    get statements() {
        const statements: Map<string, any> = new Map();
        const push = (stats: any[]) => stats.map(it => {
            statements.set(it.name.value, it)
        });
        push(this._statements);
        const toArray = (stats: Map<string, any>) => {
            const args: any[] = [];
            stats.forEach((it, key) => {
                args.push(it)
            })
            return args;
        }
        this.children.forEach(child => {
            push(child.statements)
        });
        return toArray(statements);
    }
    get filePath() {
        return this.sourceFile.fileName;
    }
    constructor(program: ts.Program | CompilerContext) {
        if (program instanceof CompilerContext) {
            this.program = program.program;
            this.parent = program;
        } else {
            this.program = program;
        }
        this.typeChecker = this.program.getTypeChecker();
        this.moduleRef = ast.moduleRef;
    }
    addChildren(key: string, child: CompilerContext) {
        this.children.set(key, child)
    }
    setSourceFile(node: ast.SourceFile) {
        this.sourceFile = node;
    }
    getSourceFiles() {
        return this.program.getSourceFiles()
    }
    getSourceFile(file: string): ast.SourceFile | undefined {
        this.typeChecker = this.program.getTypeChecker();
        const main = this.program.getSourceFiles().find(it => it.fileName === file);
        if (main) {
            return this.moduleRef.create<ast.SourceFile>(main, 'kind', (source, instance) => {
                if (ts.isIdentifier(source)) {
                    Reflect.set(instance, '__type', this.typeChecker.getTypeAtLocation(source));
                }
                Reflect.set(instance, '__node', source)
            });
        }
    }
    getTypeBySymbol(symbol: ts.Symbol) {
        const symbolObject = Reflect.get(symbol, 'exportSymbol');
        if (symbolObject) {
            Reflect.set(symbolObject, 'kind', 999);
            Reflect.set(symbol, 'exportSymbol', symbolObject);
        }
        Reflect.set(symbol, 'kind', 999);
        return this.moduleRef.create<ast.Symbol & { __node: ts.Symbol }>(symbol, 'kind', (source, target) => {
            Reflect.set(target, '__node', source)
        })
    }
    getSymbol(symbol: ts.Symbol) {
        return this.moduleRef.create<ast.Symbol & { __node: ts.Symbol }>(symbol, 'kind', (source, target) => {
            Reflect.set(target, '__node', source)
        })
    }
    create(ast?: ts.Node): ast.Node | undefined {
        if (ast) {
            return this.moduleRef.create<ast.Symbol & { __node: ts.Symbol }>(ast, 'kind', (source, target) => {
                Reflect.set(target, '__node', source)
            })
        }
    }
    exports: Map<string, any> = new Map();
    setExport(key: string, val: any) {
        this.exports.set(key, val)
    }
}