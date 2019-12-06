import { SourceFile, ExportAssignment, Identifier } from './ast';
import { PlainModule, createPlainModule, PlainModuleRef } from '@nger/plain';
@PlainModule({
    imports: [],
    providers: [SourceFile, ExportAssignment, Identifier]
})
export class TsAstModule { }
export const moduleRef: PlainModuleRef<TsAstModule> = createPlainModule(TsAstModule);