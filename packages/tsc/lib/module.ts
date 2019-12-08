import { SourceFile, ExportAssignment, Identifier, TypeReference } from './ast';
import { PlainModule, createPlainModule, PlainModuleRef } from '@nger/plain';
@PlainModule({
    imports: [],
    providers: [SourceFile, ExportAssignment, Identifier, TypeReference]
})
export class TsAstModule { }
export const moduleRef: PlainModuleRef<TsAstModule> = createPlainModule(TsAstModule);