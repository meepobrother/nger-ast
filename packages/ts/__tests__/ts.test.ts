import { moduleRef } from '../lib';
import * as ts from 'typescript';
import { createProgram } from 'typescript';
import { join } from 'path';
const program = createProgram({
    rootNames: [
        join(__dirname, 'src')
    ],
    options: {
        target: ts.ScriptTarget.ESNext,
        declaration: true
    }
});
const typeChecker = program.getTypeChecker();
const sourceFiles = program.getSourceFiles();
const files = sourceFiles.map(it => moduleRef.create(it, 'kind'))
debugger;
