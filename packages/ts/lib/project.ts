import { moduleRef, SourceFile } from '../lib';
import * as ts from 'typescript';
import { createProgram } from 'typescript';
export class Project {
    program: ts.Program;
    typeChecker: ts.TypeChecker;
    constructor(
        rootNames: string[],
        compilerOptions?: ts.CompilerOptions
    ) {
        this.program = createProgram({
            rootNames: rootNames,
            options: {
                target: ts.ScriptTarget.ESNext,
                declaration: true,
                ...compilerOptions || {}
            }
        });
        this.typeChecker = this.program.getTypeChecker();
    }
    getSourceFile(file: string): SourceFile | undefined {
        const main = this.program.getSourceFiles().find(it => it.fileName === file)
        if (main) {
            return moduleRef.create<SourceFile>(main, 'kind');
        }
    }
}