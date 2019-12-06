import { moduleRef, SourceFile } from '../lib';
import * as ts from 'typescript';
import { Project as TsMorphProject } from 'ts-morph';
export class Project {
    get program(): ts.Program {
        return this._project.getProgram().compilerObject;
    }
    get typeChecker(): ts.TypeChecker {
        return this._project.getTypeChecker().compilerObject
    }
    _project: TsMorphProject;
    constructor(
        src: string[],
        tsConfigFilePath: string
    ) {
        this._project = new TsMorphProject({
            tsConfigFilePath: tsConfigFilePath,
            addFilesFromTsConfig: true
        });
        this._project.addSourceFilesAtPaths(src);
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