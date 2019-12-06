import { moduleRef, SourceFile } from '../lib';
import * as ts from 'typescript';
import { createProgram } from 'typescript';
import glob from 'glob';
export class Project {
    program: ts.Program;
    typeChecker: ts.TypeChecker;
    constructor(
        private rootNames: string[],
        private compilerOptions?: ts.CompilerOptions
    ) {
        this.program = createProgram({
            rootNames: rootNames,
            options: {
                target: ts.ScriptTarget.ESNext,
                declaration: true,
                removeComments: false,
                noEmit: false,
                module: ts.ModuleKind.CommonJS,
                ...compilerOptions || {}
            }
        });
        this.typeChecker = this.program.getTypeChecker();
    }
    addDir(dir: string) {
        return new Promise((resolve, reject) => {
            glob(dir, (err: Error | null, files: string[]) => {
                if (err) return reject(err);
                this.rootNames.push(...files);
                this.program = createProgram({
                    rootNames: this.rootNames,
                    options: {
                        target: ts.ScriptTarget.ESNext,
                        declaration: true,
                        removeComments: false,
                        noEmit: false,
                        module: ts.ModuleKind.CommonJS,
                        ...this.compilerOptions || {}
                    }
                });
                this.typeChecker = this.program.getTypeChecker();
                resolve(this)
            })
        })
    }
    addFile(file: string) {
        this.rootNames.push(file);
        this.program = createProgram({
            rootNames: this.rootNames,
            options: {
                target: ts.ScriptTarget.ESNext,
                declaration: true,
                removeComments: false,
                noEmit: false,
                module: ts.ModuleKind.CommonJS,
                ...this.compilerOptions || {}
            }
        });
        this.typeChecker = this.program.getTypeChecker();
    }
    getSourceFile(file: string): SourceFile | undefined {
        const files = this.program.getSourceFiles();
        const main = files.find(it => it.fileName === file)
        if (main) {
            return moduleRef.create<SourceFile>(main, 'kind', (source, instance) => {
                Reflect.set(instance, '__node', source)
            });
        }
    }
}