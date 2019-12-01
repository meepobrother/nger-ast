import { SourceFile, ExportAssignment, Symbol, Identifier } from './ast';
import { PlainModule, createPlainModule } from '@nger/plain';

@PlainModule({
    imports: [],
    providers: [SourceFile, ExportAssignment, Symbol, Identifier]
})
export class TsAstModule { }
export const moduleRef = createPlainModule(TsAstModule);