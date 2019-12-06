import { SourceFile, ExportAssignment, Identifier } from './ast';
import { PlainModule, createPlainModule } from '@nger/plain';

@PlainModule({
    imports: [],
    providers: [SourceFile, ExportAssignment, Identifier]
})
export class TsAstModule { }
export const moduleRef = createPlainModule(TsAstModule);