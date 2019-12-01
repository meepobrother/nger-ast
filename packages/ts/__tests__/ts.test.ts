import { moduleRef } from '../lib';
import * as ts from 'typescript';
import { createProgram } from 'typescript';
import { join } from 'path';
const defaultCompilerOptions = ts.getDefaultCompilerOptions();
const tsconfig = ts.readJsonConfigFile(join(__dirname, 'tsconfig.json'), (path: string) => {
    return path;
})
const program = createProgram({
    rootNames: [
        join(__dirname)
    ],
    options: {
        ...defaultCompilerOptions,
        target: ts.ScriptTarget.ESNext,
        declaration: true
    }
});
const typeChecker = program.getTypeChecker();
const fileNames = program.getSourceFiles().map(it => it.fileName)
const sourceFile = program.getSourceFileByPath(join(__dirname, 'src', './demo.ts') as ts.Path);
if (sourceFile) {
    const files = moduleRef.create(sourceFile, 'kind')
    debugger;
}
debugger;
