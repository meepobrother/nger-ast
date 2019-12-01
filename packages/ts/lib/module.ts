import { SourceFile, ExportAssignment } from './ast';
import { PlainModule, createPlainModule } from '@nger/plain';

@PlainModule({
    imports: [],
    providers: [SourceFile, ExportAssignment]
})
export class TsAstModule { }
export const moduleRef = createPlainModule(TsAstModule);